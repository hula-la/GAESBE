package com.ssafy.gaese.domain.friends.controller;

import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.friends.dto.FriendSocketDto;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FriendSocketController {
    private final FriendSocketService friendSocketService;

    @MessageMapping("/friend/connect")
    public void newFriend(FriendSocketDto friendSocketDto) throws Exception{
        System.out.println("/friend/connect 들어옴");
        friendSocketService.userEnter(friendSocketDto);
    }

}
