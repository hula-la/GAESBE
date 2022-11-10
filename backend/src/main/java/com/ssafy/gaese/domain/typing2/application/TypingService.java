package com.ssafy.gaese.domain.typing2.application;

import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSubmitDto;
import com.ssafy.gaese.domain.typing2.entity.TypingParagraph;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.typing2.repository.TypingParagraphRepository;
import com.ssafy.gaese.domain.typing2.repository.TypingRecordRepository;
import com.ssafy.gaese.domain.typing2.repository.TypingRoomRedisRepository;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

        System.out.println("게임 시작");
        System.out.println(roomDto);

        // 게임 시작했다고 클라이언트에게 알리기
        res.put("msg", "start");
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);


        // 진행도 미리 보냄
        HashMap<Long, Float> progressByPlayer = new HashMap<>();
        roomDto.getPlayers().values().forEach(v->{
            progressByPlayer.put(v,0f);
        });
        roomDto.setProgressByPlayer(progressByPlayer);
        res.clear();
        res.put("roomDto",roomDto);
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);



        // 랜덤 문단
        List<TypingParagraph> randomProblem = typingParagraphRepository.findRandomProblem(1,roomDto.getLangType().name());
        TypingParagraph paragraph = randomProblem.get(0);
        Long paragraphId = paragraph.getId();

        System.out.println("선택된 문단"+paragraph.getContent());
        System.out.println("선택된 문단"+paragraph.getId());


        roomDto.setParagraphId(paragraphId);
        roomDto.setParagraphLength(paragraph.getContent().replace(" ","").length());
        //paragraph.getContent().length()
        //줄 구분할 공백 부분 카운팅 제거

//        시작 시간 알림
        roomDto.setStartTime(System.currentTimeMillis());

        roomDto = typingRoomRedisRepository.save(roomDto);

        // 문제 보내기
        res.clear();
        res.put("paragraph", paragraph.getContent());
        res.put("roomDto", roomDto);
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);
    }

    public void gameEnd(TypingRoomDto roomDto){

        Map<String,Object> res = new HashMap<>();

        // 끝났다는 메시지
        res.put("msg", "end");

        roomDto.setEnd(true);

        typingRoomRedisRepository.save(roomDto);
        deleteRoom(roomDto.getCode());
    }

    // 방 삭제 (게임 끝나면 방 삭제)
    public boolean deleteRoom(String roomId){
        typingRoomRedisRepository.deleteById(roomId);

        return true;
    }

    public void submitAnswer(TypingSubmitDto typingSubmitDto){
        Map<String,Object> res = new HashMap<>();

        TypingRoomDto roomDto = typingRoomRedisRepository
                .findById(typingSubmitDto.getRoomCode())
                .orElseThrow(()->new RoomNotFoundException());

        System.out.println("제출하고 나서"+roomDto);


        Long userId = typingSubmitDto.getUserId();
        HashMap<Long, Float> progressByPlayer = roomDto.getProgressByPlayer();
        long paragraphLength = roomDto.getParagraphLength();
//        Float Point =progressByPlayer.get(userId);
        float pointPerWord = (float) (100 / paragraphLength);
//        float pointPerWord = (float) (1);

        progressByPlayer.put(userId,progressByPlayer.get(userId)+pointPerWord);

        roomDto.setProgressByPlayer(progressByPlayer);


        // 진행도
        res.clear();
        res.put("progressByPlayer", progressByPlayer);

        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);

        // 바뀐 사항 저장
        TypingRoomDto saved = typingRoomRedisRepository.save(roomDto);

        // 한명이 다 치면 게임 끝
        if (progressByPlayer.get(userId)>=100) {
            gameEnd(saved);
//
//        res.put("msg", "end");
        }
    }

}
