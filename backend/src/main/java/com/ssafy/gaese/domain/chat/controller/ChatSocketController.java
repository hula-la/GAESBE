package com.ssafy.gaese.domain.chat.controller;

import com.ssafy.gaese.domain.chat.application.ChatService;
import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.dto.ChatSocketDto;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;
    private final SocketInfo socketInfo;

    @MessageMapping("/chat/enter")
    public void chatEnter(ChatSocketDto chatSocketDto){

        // 소켓 정보 저장
        socketInfo.setSocketInfo(chatSocketDto.getSessionId(),chatSocketDto.getMyId()+"",chatSocketDto.getFriendId()+"","chat",null);

        // 채팅방 오픈 & 메시지 확인
        chatService.enterUser(chatSocketDto);

        // 저장된 메세지 전송
        List<ChatDto> chatDtoList = chatService.getMsg(chatSocketDto.getMyId(), chatSocketDto.getFriendId());
        simpMessagingTemplate.convertAndSend("/chat/"+chatSocketDto.getMyId()+"/from/"+chatSocketDto.getFriendId(), chatDtoList);
    }

    @MessageMapping("/chat/send")
    public void sendMsg(ChatDto chatDto){
        System.out.println(chatDto.toString());
        //메시지 저장
        chatService.saveMsg(chatDto);

        if(chatService.checkOpen(chatDto.getTo(), chatDto.getFrom())){
            // 채팅방이 열려있으면 실시간 전송
            simpMessagingTemplate.convertAndSend("/chat/"+chatDto.getTo()+"/from/"+chatDto.getFrom(),chatDto);
        }else{
            chatService.updateWait(chatDto.getTo(), chatDto.getFrom(), true);
            // 채팅방이 열려있지 않으면 알림
            // 메인
            System.out.println("/friend/chat/"+chatDto.getTo());
            simpMessagingTemplate.convertAndSend("/friend/chat/"+chatDto.getTo(),chatService.waitList(chatDto.getTo()));
            // 메인 외
            simpMessagingTemplate.convertAndSend("/chat/alarm/"+chatDto.getTo(),chatDto);
        }

    }
}
