package com.ssafy.gaese.domain.chat.controller;

import com.ssafy.gaese.domain.chat.application.ChatService;
import com.ssafy.gaese.domain.chat.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;


    // 메시지 보내는 controller
    @MessageMapping("/chat/send")
    public void sendMsg(ChatDto chatDto){
        System.out.println(chatDto.toString());
        //메시지 저장
        ChatDto saved = chatService.saveMsg(chatDto);

        //친구에게 새로운 메시지를 보냈다는 신호 보내기
        simpMessagingTemplate.convertAndSend("/friend/"+chatDto.getTo(),saved);

    }
}
