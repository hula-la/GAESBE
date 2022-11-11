package com.ssafy.gaese.domain.chat.application;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.entity.Chat;
import com.ssafy.gaese.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    //메시지 저장
    public ChatDto saveMsg(ChatDto chatDto){
        Chat saved = chatRepository.save(chatDto.toEntity());
        return saved.toDto();
    }

    // 메시지 불러오기
    public List<ChatDto> getMsg(Long from, Long to){
        return chatRepository.findAllByFromIdAndToId(from,to).stream().map(chat -> chat.toDto()).collect(Collectors.toList());
    }

    //요청 표시
    public void checkSend(Long from,Long to){

    }
}
