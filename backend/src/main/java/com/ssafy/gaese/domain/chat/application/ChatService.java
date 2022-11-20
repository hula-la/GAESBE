package com.ssafy.gaese.domain.chat.application;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.dto.ChatGetDto;
import com.ssafy.gaese.domain.chat.dto.ChatPostDto;
import com.ssafy.gaese.domain.chat.entity.Chat;
import com.ssafy.gaese.domain.chat.exception.ChatNotFoundException;
import com.ssafy.gaese.domain.chat.repository.ChatRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;


    //메시지 부르기
    @Transactional
    public ChatGetDto getChats(Long userId){
        List<Chat> myChat = chatRepository.findMyChat(userId);

        HashMap<Long, List<ChatDto>> chatList = new HashMap<>();

        myChat.forEach(chat -> {
            Long fromUserId = chat.getFromUser().getId();
            Long toUserId = chat.getToUser().getId();


            // 상대 userId를 key로 저장
            Long key=null;
            if (userId==fromUserId) key=toUserId;
            else key=fromUserId;

            chatList.computeIfAbsent(key, k -> new LinkedList<>()).add(chat.toDto());

        });

        return ChatGetDto.builder().chatList(chatList).build();
    }


    @Transactional
    // 메시지 확인
    public void checkMsg(ChatPostDto chatPostDto){
        List<Long> msgIds = chatPostDto.getMsgIds();

        // 메시지들 확인했다고 체크
        msgIds.forEach(id->{
            Chat chat = chatRepository.findById(id).orElseThrow(() -> new ChatNotFoundException());
            chat.checkMsg();
        });
    }

    public ChatDto saveMsg(ChatDto chatDto){
        User toUser = userRepository.findById(chatDto.getTo()).orElseThrow(() -> new UserNotFoundException());
        User fromUser = userRepository.findById(chatDto.getFrom()).orElseThrow(()->new UserNotFoundException());

        Chat saved = chatRepository.save(chatDto.newChat(fromUser,toUser));
        return saved.toDto();
    }


}
