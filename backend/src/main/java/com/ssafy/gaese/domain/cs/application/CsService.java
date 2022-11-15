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
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
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
    private final AbilityRepository abilityRepository;



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
        if(roomDto.getIsSolvedByPlayer().get(csSubmitDto.getUserId())!=-1) throw new DoubleSubmitException();
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

        // 몇 번 선택했는지 기록
        HashMap<Integer, Integer> cntPerNum = roomDto.getCntPerNum();
        cntPerNum.put(csSubmitDto.getAnswer(),cntPerNum.get(csSubmitDto.getAnswer())+1);

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
            roomDto.getIsSolvedByPlayer().put(csSubmitDto.getUserId(),numCorrectByRound.get(round));
        } else{
            roomDto.getIsSolvedByPlayer().put(csSubmitDto.getUserId(),0);
        }



        // 개인에게 정답유무를 메시지로 보냄
        simpMessagingTemplate.convertAndSend("/cs/"+csSubmitDto.getUserId(),res);

        // 업데이트된 점수를 방 전원에게 전달
//        res.clear();
//        res.put("score",roomDto.getScore());
//        System.out.println("score****"+roomDto.getScore().toString());
//        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

        // 풀었다고 저장



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
        HashMap<Integer, Integer> cntPerNum = new HashMap<>();
        for (int i = 1; i <= 4; i++) {
            cntPerNum.put(i,0);
        }
        for (int i = 0; i < numProblem; i++) {
            numCorrectByRound.put(i,0);
        }
        roomDto.setNumCorrectByRound(numCorrectByRound);
        roomDto.setCntPerNum(cntPerNum);

//        점수 0점으로 초기화
        // 맞춘 문제 리스트 초기화
        HashMap<Long, Long> score = new HashMap<>();
        HashMap<Long, Integer> isSolvedByPlayer = new HashMap<>();

        String roomId = roomDto.getCode();

        System.out.println("초기화");


        roomDto.getPlayers().values().forEach(v->{
            score.put(v,0L);
            isSolvedByPlayer.put(v,-1);
            csRecordRedisRepository.save(CsRecordRedisDto.create(roomId, v,numProblem));
        });
        roomDto.setScore(score);
        roomDto.setIsSolvedByPlayer(isSolvedByPlayer);


        csRoomRedisRepository.save(roomDto);

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

            cntPerNum = roomDto.getCntPerNum();
            for (int j = 1; j <= 4; j++) {
                cntPerNum.put(j,0);
            }

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

            Object[][] rankList = new Object[rankEntryList.size()][4];

            for (int j = 0; j < rankEntryList.size(); j++) {
                Long userId = rankEntryList.get(j).getKey();
                User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
                rankList[j][0] = userId;
                rankList[j][1] = user.getNickname();
                rankList[j][2] = user.getProfileChar();
                rankList[j][3] = rankEntryList.get(j).getValue();
            }


            // 맞았는지
            HashMap<Long, Integer> isSolvedByPlayer1 = roomDto.getIsSolvedByPlayer();



            // 풀었는지 유무 초기화 하고 저장
            int round = i;
            roomDto.getPlayers().values().forEach(v->{
                // 사용자에게 풀었는지 유무와 정답 유무를 보냄
                String recordFindKey = roomId+v;
                CsRecordRedisDto csRecordRedisDto = csRecordRedisRepository.findById(recordFindKey).orElseThrow(() -> new RecordNotFoundException());
                res.clear();

                res.put("isSolved", isSolvedByPlayer1.get(v));

                simpMessagingTemplate.convertAndSend("/cs/"+v,res);
                isSolvedByPlayer1.put(v,-1);
            });

            roomDto.setIsSolvedByPlayer(isSolvedByPlayer1);
            csRoomRedisRepository.save(roomDto);


            // 방 전원에게 ranking을 보내줌
            res.clear();
            res.put("ranking", rankList);
            res.put("solveOrder", isSolvedByPlayer1);

            // 답 보내 줌
            Integer answer = csProblemRepository
                    .findById(roomDto.getCurrentIdx())
                    .orElseThrow(() -> new ProblemNotFoundException()).getAnswer();
            res.put("answer", answer);

            // 답마다 cnt 보내 줌
            cntPerNum = roomDto.getCntPerNum();
            res.put("cntPerNum", cntPerNum);

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
//        res.put("result", roomDto);

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


        // 기록
        roomDto.getPlayers().forEach((k,v)->{
            CsRecord csRecord = CsRecord.builder()
                    .user(userRepository.findById(v).orElseThrow(() -> new UserNotFoundException()))
                    .ranks(rankByPlayer.get(v))
                    .date(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .build();
            CsRecord saved = csRecordRepository.save(csRecord);


            // 레디스에 저장되어잇는 기록 db에 저장
            CsRecordRedisDto csRecordRedisDto = csRecordRedisRepository.findById(roomDto.getCode() + v).orElseThrow(() -> new RoomNotFoundException());
            Boolean[] isCorrectedList = csRecordRedisDto.getIsCorrectList();
            int correctCnt = 0;
            for (int i = 0; i < numProblem; i++) {
                CsRecordProblem csRecordProblem = CsRecordProblem.builder()
                        .csProblem(randomProblem.get(i))
                        .csRecord(saved)
                        .isCorrect(isCorrectedList[i])
                        .build();

                if (isCorrectedList[i]) correctCnt++;
                csRecordProblemRepository.save(csRecordProblem);
            }

            // 맞은 갯수가 3분의 1이상이어야 함.
            if (correctCnt>=numProblem/3){
                Ability ability = abilityRepository.findByUser_Id(v).get();
                ability.addExp("cs", 1);

                if (rankByPlayer.get(v)==1) ability.addExp("cs", 2);
                else if (rankByPlayer.get(v)>=3) ability.addExp("cs", 1);
            }

            csRecordRedisRepository.deleteById(roomDto.getCode() + v);
        });

    }

}
