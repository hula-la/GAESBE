package com.ssafy.gaese.domain.chat.controller;

import com.ssafy.gaese.domain.chat.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChattingController {

    //@EnableWebSocketMessageBroker 를 통해서 등록되는 Bean이다. Broker로 메시지를 전달한다.
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/receive") // prefix 와 합쳐짐
    public void greetingTest(Message message) throws Exception{
        System.out.println(message.getContent());
        simpMessagingTemplate.convertAndSend("/topic/chat",message);
    }

}
