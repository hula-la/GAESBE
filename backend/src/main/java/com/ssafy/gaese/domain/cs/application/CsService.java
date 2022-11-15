package com.ssafy.gaese.domain.cs.application;

import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.cs.dto.redis.CsRecordRedisDto;
import com.ssafy.gaese.domain.cs.dto.redis.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.cs.exception.*;
import com.ssafy.gaese.domain.cs.repository.*;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CsService {

    private final CsRecordRepository csRecordRepository;
    private final CsProblemRepository csProblemRepository;
    private final UserRepository userRepository;

    private final CsRoomRedisRepository csRoomRedisRepository;
    private final CsRecordRedisRepository csRecordRedisRepository;
    private final CsRecordProblemRepository csRecordProblemRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;


    private final int penaltyScore=60;

    private final int numProblem=3;

    public Page<CsRecordDto> findCsRecord(Long userId, Pageable pageable){
        Page<CsRecord> CsRecords = csRecordRepository
                .findAllByUser(userRepository.findById(userId).orElseThrow(()->new UserNotFoundException()), pageable);
        Page<CsRecordDto> csRecordsDtoPage = CsRecords.map((csRecord) -> csRecord.toDto());
        return csRecordsDtoPage;
    }


    // 동시에 처리를 못하도록 synchronized
    public synchronized CsRoomDto submitAnswer(CsSubmitDto csSubmitDto){
        Map<String,Object> res = new HashMap<>();

        CsRoomDto roomDto = csRoomRedisRepository
                .findById(csSubmitDto.getRoomCode())
                .orElseThrow(()->new RoomNotFoundException());



        // 사용자의 문제와 서버의 문제가 다르면 시간초과 에러 발생
        // 한번더 제출하면 안됨
        if(roomDto.getIsSolvedByPlayer().get(csSubmitDto.getUserId())) throw new DoubleSubmitException();
        if(roomDto.getCurrentIdx()!=csSubmitDto.getProblemId()) {
            System.out.println("문제가 지나침");
            System.out.println("찐 문제 번호"+roomDto.getCurrentIdx());
            System.out.println("사용자 문제 번호"+csSubmitDto.getProblemId());
            throw new ExceedTimeException();
        }


        // 문제가 같으면 계속 진행
        // 해당 문제의 답과 사용자가 제출한 답이 일치하는지 확인
        boolean isCorrected = answerCheck(csSubmitDto);
        // 몇번째 라운든지 확인
        int round = roomDto.getRound();
        Long userId = csSubmitDto.getUserId();
        res.put("msg","submit");

        if(isCorrected){
            // 정답이라는 response를 보냄.

            CsRecordRedisDto csRecordRedisDto = csRecordRedisRepository.findById(roomDto.getCode()+userId).orElseThrow(()->new RoomNotFoundException());


            csRecordRedisDto.getIsCorrectList()[round]=true;
            csRecordRedisRepository.save(csRecordRedisDto);

            // 제출 순서에 따른 점수 책정
            HashMap<Integer, Integer> numCorrectByRound = roomDto.getNumCorrectByRound();

            // 점수 주기
            HashMap<Long, Long> score = roomDto.getScore();
            System.out.println("점수 주기 전"+score.toString());
            score.put(userId,score.get(userId)+(1000-penaltyScore*numCorrectByRound.get(round)));
            roomDto.setScore(score);

            // 한명 맞췄으니 numCorrectByRound 카운팅
            numCorrectByRound.put(round,numCorrectByRound.get(round)+1);
        }



        // 개인에게 정답유무를 메시지로 보냄
        simpMessagingTemplate.convertAndSend("/cs/"+csSubmitDto.getUserId(),res);

        // 업데이트된 점수를 방 전원에게 전달
//        res.clear();
//        res.put("score",roomDto.getScore());
//        System.out.println("score****"+roomDto.getScore().toString());
//        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

        // 풀었다고 저장
        roomDto.getIsSolvedByPlayer().put(csSubmitDto.getUserId(),true);


        // 바뀐 사항 저장
        return csRoomRedisRepository.save(roomDto);
    }

    public boolean answerCheck(CsSubmitDto csSubmitDto){
        CsProblem csProblem = csProblemRepository
                .findById(csSubmitDto.getProblemId())
                .orElseThrow(() -> new ProblemNotFoundException());

        if(csProblem.getAnswer()==csSubmitDto.getAnswer()) return true;
        else return false;
    }

    public CsRoomDto gameStart(CsRoomDto roomDto, List<CsProblem> randomProblem) throws InterruptedException {
        Map<String,Object> res = new HashMap<>();

//        roomDto.setRoomStatus(CsRoomDto.RoomStatus.START);
//        CsRoomDto saved = csRoomRedisRepository.save(roomDto);

        // 게임 시작했다고 클라이언트에게 알리기
        res.put("msg", "start");
        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);


        CsProblem currentCsProblem = null;

        // numCorrectByRound 초기화
        HashMap<Integer, Integer> numCorrectByRound = new HashMap<>();
        for (int i = 0; i < numProblem; i++) {
            numCorrectByRound.put(i,0);
        }
        roomDto.setNumCorrectByRound(numCorrectByRound);

//        점수 0점으로 초기화
        // 맞춘 문제 리스트 초기화
        HashMap<Long, Long> score = new HashMap<>();
        HashMap<Long, Boolean> isSolvedByPlayer = new HashMap<>();

        String roomId = roomDto.getCode();

        System.out.println("초기화");


        roomDto.getPlayers().values().forEach(v->{
            score.put(v,0L);
            isSolvedByPlayer.put(v,false);
            csRecordRedisRepository.save(CsRecordRedisDto.create(roomId, v,numProblem));
        });
        roomDto.setScore(score);
        roomDto.setIsSolvedByPlayer(isSolvedByPlayer);


        roomDto = csRoomRedisRepository.save(roomDto);

        for (int i = 0; i < randomProblem.size(); i++) {
            System.out.println(i+"번째 문제");
            currentCsProblem = randomProblem.get(i);

            res.clear();
            res.put("currentProblem", csProblemRepository.findById(currentCsProblem.getId()));

            simpMessagingTemplate.convertAndSend("/cs/room/"+roomId,res);

            // 현재 문제 번호 redis에 저장
//            simpMessagingTemplate.convertAndSend("/cs/room/"+roomId,res);

            roomDto = csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());
            roomDto.setCurrentIdx(currentCsProblem.getId());
            roomDto.setRound(i);

            csRoomRedisRepository.save(roomDto);

            //            게임 시작하고 60초 타이머
            Thread.sleep(10*1000);


            // **********문제는 끝
            // 중간 정보 주기
            roomDto = csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());
            HashMap<Long, Long> currentScore = roomDto.getScore();

            // 점수 순으로 정렬
            List<Map.Entry<Long, Long>> rankEntryList = new LinkedList<>(currentScore.entrySet());
            rankEntryList.sort((o1, o2) -> -o1.getValue().compareTo(o2.getValue()));

            Object[][] rankList = new Object[rankEntryList.size()][3];

            for (int j = 0; j < rankEntryList.size(); j++) {
                Long userId = rankEntryList.get(j).getKey();
                User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
                rankList[j][0] = userId;
                rankList[j][1] = user.getNickname();
                rankList[j][2] = rankEntryList.get(j).getValue();
            }


            // 맞았는지
            HashMap<Long, Boolean> isSolvedByPlayer1 = roomDto.getIsSolvedByPlayer();



            // 풀었는지 유무 초기화 하고 저장
            int round = i;
            roomDto.getPlayers().values().forEach(v->{
                // 사용자에게 풀었는지 유무와 정답 유무를 보냄
                String recordFindKey = roomId+v;
                CsRecordRedisDto csRecordRedisDto = csRecordRedisRepository.findById(recordFindKey).orElseThrow(() -> new RecordNotFoundException());
                res.clear();
                res.put("isCorrect", csRecordRedisDto.getIsCorrectList()[round]);
                res.put("isSolved", isSolvedByPlayer1.get(v));

                simpMessagingTemplate.convertAndSend("/cs/"+v,res);
                isSolvedByPlayer1.put(v,false);
            });

            roomDto.setIsSolvedByPlayer(isSolvedByPlayer1);
            csRoomRedisRepository.save(roomDto);


            // 방 전원에게 ranking을 보내줌
            res.clear();
            res.put("ranking", rankList);
            simpMessagingTemplate.convertAndSend("/cs/room/"+roomId,res);

            //            게임 시작하고 60초 타이머
            Thread.sleep(10*1000);
        }

        return csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());



    }

    public void gameEnd(CsRoomDto roomDto,List<CsProblem> randomProblem){

        Map<String,Object> res = new HashMap<>();

        // 끝났다는 메시지
        res.put("msg", "end");

//        마지막 결과 보내기
        res.put("result", roomDto);

        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);



        HashMap<Long, Long> score = roomDto.getScore();

        HashMap<Long, Integer> rankByPlayer = new HashMap<>();

        List<Map.Entry<Long, Long>> entryList = new LinkedList<>(score.entrySet());
        entryList.sort((o1, o2) -> -o1.getValue().compareTo(o2.getValue()));

        int rank=0;
        long lastScore=-1;


        for(Map.Entry<Long, Long> entry : entryList){
            if (lastScore!=entry.getValue()) rank++;
            rankByPlayer.put(entry.getKey(),rank);
        }


        roomDto.getPlayers().forEach((k,v)->{
            CsRecord csRecord = CsRecord.builder()
                    .user(userRepository.findById(Long.valueOf(v)).orElseThrow(() -> new UserNotFoundException()))
                    .ranks(rankByPlayer.get(v))
                    .date(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .build();
            CsRecord saved = csRecordRepository.save(csRecord);


            // 레디스에 저장되어잇는 기록 db에 저장
            CsRecordRedisDto csRecordRedisDto = csRecordRedisRepository.findById(roomDto.getCode() + v).orElseThrow(() -> new RoomNotFoundException());
            Boolean[] isCorrectedList = csRecordRedisDto.getIsCorrectList();
            for (int i = 0; i < numProblem; i++) {
                CsRecordProblem csRecordProblem = CsRecordProblem.builder()
                        .csProblem(randomProblem.get(i))
                        .csRecord(saved)
                        .isCorrect(isCorrectedList[i])
                        .build();
                csRecordProblemRepository.save(csRecordProblem);
            }
            csRecordRedisRepository.deleteById(roomDto.getCode() + v);
        });

    }

}
