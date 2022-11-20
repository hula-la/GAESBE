package com.ssafy.gaese.domain.friends.application;

import com.ssafy.gaese.domain.friends.dto.FriendInviteGameDto;
import com.ssafy.gaese.domain.friends.dto.FriendSocketDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class FriendGameService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void inviteFriend(FriendInviteGameDto friendInviteGameDto){
        HashMap<String, String> res = new HashMap<>();
        res.put("inviteGameType",friendInviteGameDto.getGameType());
        res.put("inviteRoomCode",friendInviteGameDto.getRoomCode());
        res.put("fromUserNick",friendInviteGameDto.getFromUserNick());
        simpMessagingTemplate.convertAndSend("/friend/"+friendInviteGameDto.getUserId(),res);
    }
}
