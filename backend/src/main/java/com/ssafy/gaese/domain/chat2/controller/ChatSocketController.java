//package com.ssafy.gaese.domain.chat2.controller;
//
//import com.ssafy.gaese.domain.chat2.application.ChatService;
//import com.ssafy.gaese.domain.chat.dto.ChatDto;
//import com.ssafy.gaese.global.redis.SocketInfo;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class ChatSocketController {
//
//    private final SimpMessagingTemplate simpMessagingTemplate;
//    private final ChatService chatService;
//    private final SocketInfo socketInfo;
//
//
//    // 메시지 보내는 controller
//    @MessageMapping("/chat/send")
//    public void sendMsg(ChatDto chatDto){
//        System.out.println(chatDto.toString());
//        //메시지 저장
//        chatService.saveMsg(chatDto);
//
//        //친구에게 새로운 메시지를 보냈다는 신호 보내기
//        simpMessagingTemplate.convertAndSend("/friend/"+chatDto.getTo(),chatDto);
//
//    }
//}
