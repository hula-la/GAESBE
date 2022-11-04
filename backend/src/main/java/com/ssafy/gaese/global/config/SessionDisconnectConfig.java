package com.ssafy.gaese.global.config;

import com.ssafy.gaese.global.redis.SocketInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
public class SessionDisconnectConfig {


    @Autowired
    SocketInfo socketInfo;

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) throws Exception
    {
        String sessionId=event.getSessionId();

        //순서 : {id},{roomCode},{gameType},{nickName}
        String[] info = socketInfo.geSocketInfo(sessionId).split(",");

        //각자 처리가 필요한 곳으로 보냄
        switch (info[2])
        {
            //ex
            case "Typing":

                break;

            default: break;
        }
    }
}
