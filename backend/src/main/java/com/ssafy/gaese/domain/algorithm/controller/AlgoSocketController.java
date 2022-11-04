package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AlgoSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate; // broker로 메시지 전달
    private final AlgoService algoService;

    // 알고리즘 방 입장/나가기
    @MessageMapping("/algo")
    public void algoRoom(AlgoSocketDto algoSocketDto) throws Exception{
        List<String> userIds = new LinkedList<>();
        Map<String,Object> res = new HashMap<>();

        if(algoSocketDto.getType() == AlgoSocketDto.Type.ENTER){
            userIds.addAll(algoService.enterRoom(algoSocketDto));
            res.put("msg",algoSocketDto.getUserId()+"님이 접속하셨습니다.");
        }else if(algoSocketDto.getType() == AlgoSocketDto.Type.LEAVE){
            userIds.addAll(algoService.leaveRoom(algoSocketDto));
            res.put("msg",algoSocketDto.getUserId()+"님이 나가셨습니다.");
        }

        List<UserDto> users = algoService.getUsers(userIds);
        res.put("users",users);
        simpMessagingTemplate.convertAndSend("/algo/room/"+algoSocketDto.getRoomCode(),res);

    }

}
