package com.ssafy.gaese.domain.typing2.application;

import com.ssafy.gaese.domain.cs.dto.CsRecordRedisDto;
import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.exception.DoubleSubmitException;
import com.ssafy.gaese.domain.cs.exception.ExceedTimeException;
import com.ssafy.gaese.domain.cs.exception.RecordNotFoundException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSubmitDto;
import com.ssafy.gaese.domain.typing2.entity.TypingParagraph;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.typing2.exception.AlreadyEndException;
import com.ssafy.gaese.domain.typing2.repository.*;
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
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TypingService {

    private final TypingRecordRepository typingRecordRepository;
    private final TypingParagraphRepository typingParagraphRepository;
    private final UserRepository userRepository;

    private final TypingRoomRedisRepository typingRoomRedisRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;


    public Page<TypingRecordDto> findTypingRecord(Long userId, Pageable pageable){
        Page<TypingRecord> TypingRecords = typingRecordRepository
                .findAllByUser(userRepository.findById(userId).orElseThrow(()->new UserNotFoundException()), pageable);
        Page<TypingRecordDto> typingRecordDtoPage = TypingRecords.map((typingRecord) -> typingRecord.toDto());
        return typingRecordDtoPage;
    }


    public void gameStart(TypingRoomDto roomDto) throws InterruptedException {
        Map<String,Object> res = new HashMap<>();


        // 게임 시작했다고 클라이언트에게 알리기
        res.put("msg", "start");
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);

        List<TypingParagraph> randomProblem = typingParagraphRepository.findRandomProblem(1,roomDto.getLangType());

        TypingParagraph paragraph = randomProblem.get(0);
        Long paragraphId = paragraph.getId();

        // numCorrectByRound 초기화
        HashMap<Long, Float> progressByPlayer = new HashMap<>();


        roomDto.getPlayers().values().forEach(v->{
            progressByPlayer.put(v,0f);
        });
        roomDto.setProgressByPlayer(progressByPlayer);
        roomDto.setParagraphId(paragraphId);
        roomDto.setParagraphLength(paragraph.getContent().length());

//        시작 시간 알림
        roomDto.setStartTime(System.currentTimeMillis());


        roomDto = typingRoomRedisRepository.save(roomDto);

        // 문제 보내기
        res.put("paragraph", paragraph.getContent());
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);
    }

    public void gameEnd(TypingRoomDto roomDto, List<CsProblem> randomProblem){

        Map<String,Object> res = new HashMap<>();

        // 끝났다는 메시지
        res.put("msg", "end");

//        마지막 결과 보내기
//        res.put("result", roomDto);
//
//        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);
//
//
//
//        HashMap<Long, Long> score = roomDto.getScore();
//
//        HashMap<Long, Integer> rankByPlayer = new HashMap<>();
//
//        List<Map.Entry<Long, Long>> entryList = new LinkedList<>(score.entrySet());
//        entryList.sort((o1, o2) -> -o1.getValue().compareTo(o2.getValue()));
//
//        int rank=0;
//        long lastScore=-1;
//
//
//        for(Map.Entry<Long, Long> entry : entryList){
//            if (lastScore!=entry.getValue()) rank++;
//            rankByPlayer.put(entry.getKey(),rank);
//        }
//
//
//        roomDto.getPlayers().forEach((k,v)->{
//            CsRecord csRecord = CsRecord.builder()
//                    .user(userRepository.findById(Long.valueOf(v)).orElseThrow(() -> new UserNotFoundException()))
//                    .ranks(rankByPlayer.get(v))
//                    .date(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
//                    .build();
//            CsRecord saved = csRecordRepository.save(csRecord);
//
//
//            // 레디스에 저장되어잇는 기록 db에 저장
//            TypingRecordRedisDto csRecordRedisDto = typingRecordRedisRepository.findById(roomDto.getCode() + v).orElseThrow(() -> new RoomNotFoundException());
//            Boolean[] isCorrectedList = csRecordRedisDto.getIsCorrectList();
//            for (int i = 0; i < numProblem; i++) {
//                TypingRecord csRecordProblem = TypingRecord.builder()
//                        .csProblem(randomProblem.get(i))
//                        .csRecord(saved)
//                        .isCorrect(isCorrectedList[i])
//                        .build();
//                typingRecordProblemRepository.save(csRecordProblem);
//            }
//            typingRecordRedisRepository.deleteById(roomDto.getCode() + v);
//        });

    }

    public synchronized void submitAnswer(TypingSubmitDto typingSubmitDto){
        Map<String,Object> res = new HashMap<>();

        TypingRoomDto roomDto = typingRoomRedisRepository
                .findById(typingSubmitDto.getRoomCode())
                .orElseThrow(()->new RoomNotFoundException());

        System.out.println("제출하고 나서"+roomDto);

        HashMap<Long, Float> progressByPlayer = roomDto.getProgressByPlayer();
        long paragraphLength = roomDto.getParagraphLength();
        float pointPerWord = (float) (100 / paragraphLength);
        Long userId = typingSubmitDto.getUserId();

        progressByPlayer.put(userId,progressByPlayer.get(userId)+pointPerWord);

        roomDto.setProgressByPlayer(progressByPlayer);


        // 진행도
        res.clear();
        res.put("progressByPlayer", progressByPlayer);

        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

        // 바뀐 사항 저장
        typingRoomRedisRepository.save(roomDto);
    }

}
