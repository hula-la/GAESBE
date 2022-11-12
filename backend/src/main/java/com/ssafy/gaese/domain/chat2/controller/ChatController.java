package com.ssafy.gaese.domain.chat2.controller;


import com.ssafy.gaese.domain.chat2.application.ChatService;
import com.ssafy.gaese.domain.chat2.dto.ChatGetDto;
import com.ssafy.gaese.domain.chat2.dto.ChatPostDto;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;


    // 이전 메시지들 부르는
    @GetMapping("/chat")
    public ChatGetDto getChats(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        Long userId = customUserDetails.getId();
        //메시지 저장
        return chatService.getChats(userId);
    }

    // 해당 메시지를 봤다는 신호 보내기
    @PostMapping("/chat")
    public void chackMsg(ChatPostDto chatPostDto){
        //메시지 저장
        chatService.checkMsg(chatPostDto);
    }


}
