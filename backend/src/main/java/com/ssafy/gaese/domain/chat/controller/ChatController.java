package com.ssafy.gaese.domain.chat.controller;


import com.ssafy.gaese.domain.chat.application.ChatService;
import com.ssafy.gaese.domain.chat.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@Slf4j
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{rUserId}/{lUserId}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable String rUserId, @PathVariable String lUserId){
        return ResponseEntity.ok().body(chatService.getAllMessages(rUserId, lUserId));
    }
}
