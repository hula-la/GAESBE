package com.ssafy.gaese.domain.friends.controller;

import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import com.ssafy.gaese.domain.friends.application.FriendGameService;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.friends.dto.FriendInviteGameDto;
import com.ssafy.gaese.domain.friends.dto.FriendSocketDto;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FriendSocketController {
    private final FriendSocketService friendSocketService;
    private final FriendGameService friendGameService;

    @MessageMapping("/friend/connect")
    public void newFriend(FriendSocketDto friendSocketDto) throws Exception{
        System.out.println("/friend/connect 들어옴");
        friendSocketService.userEnter(friendSocketDto);
    }


    @MessageMapping("/friend/invite")
    public void newFriend(FriendInviteGameDto friendSocketDto) throws Exception{
        System.out.println("/friend/invite 들어옴");
        friendGameService.inviteFriend(friendSocketDto);
    }
    @MessageMapping("/friend/refresh")
    public void refreshFriend(FriendInviteGameDto friendSocketDto) throws Exception{
        System.out.println("/friend/refresh 들어옴");
        friendSocketService.findFriendList(friendSocketDto.getUserId());
    }

}
