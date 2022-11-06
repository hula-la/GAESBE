package com.ssafy.gaese.global.config;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.domain.cs.application.CsRoomService;
import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
@RequiredArgsConstructor
public class SessionDisconnectConfig {


    private final SocketInfo socketInfo;

    private final CsRoomService csRoomService;

    private final AlgoService algoService;

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) throws Exception
    {
        String sessionId=event.getSessionId();
        System.out.println("나가는 세션 : "+ sessionId);

        //순서 : {id},{roomCode},{gameType},{nickName}
        String[] info = socketInfo.geSocketInfo(sessionId).split(",");

        //각자 처리가 필요한 곳으로 보냄
        switch (info[2])
        {
            //ex
            case "Typing":

                break;
            case "Cs":
                CsSocketDto csSocketDto = CsSocketDto.builder()
                        .type(CsSocketDto.Type.LEAVE)
                        .userId(Long.parseLong(info[0]))
                        .roomCode(info[1])
                        .sessionId(sessionId)
                        .build();

                csRoomService.enterOrLeave(csSocketDto);
                break;
            case "Algo" :
                AlgoSocketDto algoSocketDto = AlgoSocketDto.builder()
                        .sessionId(sessionId)
                        .roomCode(info[1])
                        .userId(info[0]).build();

                algoService.leaveRoom(algoSocketDto);
                break;

            default: break;
        }

        socketInfo.delSocketInfo(sessionId);
    }
}
