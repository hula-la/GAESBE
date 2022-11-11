package com.ssafy.gaese.domain.chat.controller;


import com.ssafy.gaese.domain.chat.application.ChatService;
import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.dto.ChatSocketDto;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@Slf4j
@RequiredArgsConstructor
public class ChatController {


}
