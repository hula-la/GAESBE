package com.ssafy.gaese.domain.cs.application;

import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.cs.exception.ExceedTimeException;
import com.ssafy.gaese.domain.cs.exception.ProblemNotFoundException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.cs.repository.CsProblemRepository;
import com.ssafy.gaese.domain.cs.repository.CsRecordProblemRepository;
import com.ssafy.gaese.domain.cs.repository.CsRecordRepository;
import com.ssafy.gaese.domain.cs.repository.CsRoomRedisRepository;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CsService {

    private final CsRecordRepository csRecordRepository;
    private final CsProblemRepository csProblemRepository;
    private final UserRepository userRepository;
    private final RedisUtil redisUtil;


    private final CsRoomRedisRepository csRoomRedisRepository;
    private final CsRecordProblemRepository csRecordProblemRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;


    private final int penaltyScore=60;

    private final int numProblem=10;

    public Page<CsRecordDto> findCsRecord(Long userId, Pageable pageable){
        Page<CsRecord> CsRecords = csRecordRepository
                .findAllByUser(userRepository.findById(userId).orElseThrow(()->new UserNotFoundException()), pageable);
        Page<CsRecordDto> csRecordsDtoPage = CsRecords.map((csRecord) -> csRecord.toDto());
        return csRecordsDtoPage;
    }


    public CsRoomDto submitAnswer(CsSubmitDto csSubmitDto){
        Map<String,Object> res = new HashMap<>();

        CsRoomDto roomDto = csRoomRedisRepository
                .findById(csSubmitDto.getRoomCode())
                .orElseThrow(()->new RoomNotFoundException());

        System.out.println("여기까지 1");
        System.out.println("현재 "+roomDto.getCurrentIdx());
        System.out.println("사용자꺼 "+csSubmitDto.getProblemId());


        // 사용자의 문제와 서버의 문제가 다르면 시간초과 에러 발생생
        if(roomDto.getCurrentIdx()!=csSubmitDto.getProblemId()) throw new ExceedTimeException();

        System.out.println("여기까지 2");
        // 문제가 같으면
        boolean isCorrected = answerCheck(csSubmitDto);
        int round = roomDto.getRound();
        Long userId = csSubmitDto.getUserId();
        if(isCorrected){
            res.put("result","정답입니다.");

            HashMap<Long, Boolean[]> isCorrectedList = roomDto.getIsCorrectedList();
            if (isCorrectedList==null) {
                isCorrectedList = new HashMap<Long, Boolean[]>();
                HashMap<Long, Boolean[]> finalIsCorrectedList = isCorrectedList;
                roomDto.getPlayers().values().stream().forEach(player->{
                    finalIsCorrectedList.put(player,new Boolean[numProblem]);
                });

            };

            // 해당 idx에 true 넣음

//            if (!isCorrectedList.containsKey(userId)) {
//                isCorrectedList.put(userId,new Boolean[numProblem]);
//            }

            // 제일 처음 idx면 배열 만들고
            isCorrectedList.get(userId)[round] = true;

            // 제출 순서에 따른 점수 책정정
            HashMap<Integer, Integer> numCorrectByRound = roomDto.getNumCorrectByRound();
            if (numCorrectByRound==null) numCorrectByRound = new HashMap<Integer, Integer>();
            if (!numCorrectByRound.containsKey(round)){
                numCorrectByRound.put(round,0);
            }
            // 점수 주기
            HashMap<Long, Long> score = roomDto.getScore();
            if (score==null) score = new HashMap<Long, Long>();
            if (!score.containsKey(userId)){
                score.put(userId,0L);
            }

            score.put(userId,score.get(userId)+(1000-penaltyScore*numCorrectByRound.get(round)));

            numCorrectByRound.put(round,numCorrectByRound.get(round)+1);
        } else {
            res.put("result","오답입니다.");
        }
        simpMessagingTemplate.convertAndSend("/cs/"+csSubmitDto.getUserId(),res);



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

        roomDto.setRoomStatus(CsRoomDto.RoomStatus.START);
        CsRoomDto saved = csRoomRedisRepository.save(roomDto);

        // 게임 시작했다고 클라이언트에게 알리기
        res.put("msg", "start");
        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

//            게임 시작하고 5초 타이머
        Thread.sleep(5*1000);


        CsProblem currentCsProblem = null;

        for (int i = 0; i < randomProblem.size(); i++) {
            System.out.println(i+"번째 문제");
            currentCsProblem = randomProblem.get(i);

            res.clear();
            res.put("currentProblem", csProblemRepository.findById(currentCsProblem.getId()));

            simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

            // 현재 문제 번호 redis에 저장
            simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);
            saved.setCurrentIdx(currentCsProblem.getId());
            saved.setRound(i);

            saved = csRoomRedisRepository.save(saved);

            //            게임 시작하고 60초 타이머
            Thread.sleep(10*1000);

        }

        return saved;



    }

    public void gameEnd(CsRoomDto roomDto,List<CsProblem> randomProblem){
        HashMap<Long, Boolean[]> isCorrectedList = roomDto.getIsCorrectedList();
        if (isCorrectedList==null) isCorrectedList = new HashMap<Long, Boolean[]>();

        HashMap<Long, Long> score = roomDto.getScore();
        if (score==null) score = new HashMap<Long, Long>();

        HashMap<Long, Integer> rankByPlayer = new HashMap<>();

        List<Map.Entry<Long, Long>> entryList = new LinkedList<>(score.entrySet());
        entryList.sort(Map.Entry.comparingByValue());

        int rank=1;
        for(Map.Entry<Long, Long> entry : entryList){
            rankByPlayer.put(entry.getKey(),rank++);
        }


        isCorrectedList.forEach((k,v)->{
            CsRecord csRecord = CsRecord.builder()
                    .user(userRepository.findById(k).orElseThrow(() -> new UserNotFoundException()))
                    .date(new Date())
                    .ranks(rankByPlayer.get(k))
                    .build();
            CsRecord saved = csRecordRepository.save(csRecord);
            for (int i = 0; i < numProblem; i++) {
                CsRecordProblem csRecordProblem = CsRecordProblem.builder()
                        .csProblem(randomProblem.get(i))
                        .csRecord(saved)
                        .build();
                csRecordProblemRepository.save(csRecordProblem);
            }
        });

    }

}
