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

    //  메세지 보내면 여기로 받음
    @MessageMapping("/chat/send") // prefix 와 합쳐짐
    public void sendMessage(ChatDto chatDto) throws Exception{
        //메시지 저장

    }
}
