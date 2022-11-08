package com.ssafy.gaese.domain.typing2.controller;

import com.ssafy.gaese.domain.typing2.application.Typing2RoomService;
import com.ssafy.gaese.domain.typing2.application.TypingService;
import com.ssafy.gaese.domain.typing2.dto.TypingSocketDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSubmitDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TypingSocketController {
     // broker로 메시지 전달
    private final Typing2RoomService typing2RoomService;
    private final TypingService typingService;

    // 알고리즘 방 입장/나가기
    @MessageMapping("/typing2")
    public void algoRoom(TypingSocketDto csSocketDto) throws Exception{
        typing2RoomService.enterOrLeave(csSocketDto);
    }

    // 문제 제출
    @MessageMapping("/typing2/submit")
    public void submitAnswer(TypingSubmitDto csSubmitDto) throws Exception{
        typingService.submitAnswer(csSubmitDto);
    }

    @MessageMapping("/typing2/memberInfo")
    public void memberInfo(TypingSubmitDto csSubmitDto) throws Exception{
        typing2RoomService.getUserInRoom(csSubmitDto.getRoomCode());
    }

    @MessageMapping("/typing2/start")
    public void memberInfo(TypingSocketDto csSocketDto) throws Exception{
        typing2RoomService.gameProcess(csSocketDto);
    }


}
