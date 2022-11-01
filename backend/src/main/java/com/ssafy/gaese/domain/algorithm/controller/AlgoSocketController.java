package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.chat.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AlgoSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate; // broker로 메시지 전달

    // 방 입장
    @MessageMapping("/algo")
    public void greetingTest(AlgoRoomDto algoRoomDto) throws Exception{
        System.out.println(algoRoomDto.toString());
        simpMessagingTemplate.convertAndSend("/algo/room/"+algoRoomDto.getCode(),algoRoomDto);
    }
}
