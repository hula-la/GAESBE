package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.domain.cs.dto.UserDto;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class AlgoSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate; // broker로 메시지 전달
    private final AlgoService algoService;
    private final UserRepository userRepository;

    // 알고리즘 방 입장/나가기
    @MessageMapping("/algo")
    public void algoRoom(AlgoSocketDto algoSocketDto) throws Exception{
        List<String> userIds=null;
        Map<String,Object> res = new HashMap<>();
        if(algoSocketDto.getType() == AlgoSocketDto.Type.ENTER){
            userIds = algoService.enterRoom(algoSocketDto);
            res.put("msg",algoSocketDto.getUserId()+"님이 접속하셨습니다.");
        }else if(algoSocketDto.getType() == AlgoSocketDto.Type.LEAVE){
            userIds = algoService.leaveRoom(algoSocketDto);
            res.put("msg",algoSocketDto.getUserId()+"님이 나가셨습니다.");
        }

        List<UserDto> users = userRepository.findUsersByIds(userIds.stream().map(id->Long.parseLong(id)).collect(Collectors.toList())).stream().map(
                user -> user.toDto()).collect(Collectors.toList());
        res.put("users",users);
        simpMessagingTemplate.convertAndSend("/algo/room/"+algoSocketDto.getRoomCode(),res);
    }

}
