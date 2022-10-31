package com.ssafy.gaese.domain.algorithm.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

@Service
public class SocketService {
    private Map waitingUsers;
    private Map connectedUsers;
    private ReentrantReadWriteLock lock;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    public void sendMessage(String chatRoomId, String chatMessage){
        String destination =  getDestination(chatRoomId);
        messagingTemplate.convertAndSend(destination,chatMessage);
    }
    private String getDestination(String chatRoomId){
        return "/topic/chat/" + chatRoomId;
    }
}
