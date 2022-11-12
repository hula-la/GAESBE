package com.ssafy.gaese.domain.chat2.application;


import com.ssafy.gaese.domain.chat2.dto.ChatDto;
import com.ssafy.gaese.domain.chat2.dto.ChatGetDto;
import com.ssafy.gaese.domain.chat2.dto.ChatPostDto;
import com.ssafy.gaese.domain.chat2.entity.Chat;
import com.ssafy.gaese.domain.chat2.exception.ChatNotFoundException;
import com.ssafy.gaese.domain.chat2.repository.ChatRepository;
import com.ssafy.gaese.domain.friends.application.FriendService;
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


    // 메시지 확인
    public void checkMsg(ChatPostDto chatPostDto){
        List<Long> msgIds = chatPostDto.getMsgIds();

        // 메시지들 확인했다고 체크
        msgIds.forEach(id->{
            Chat chat = chatRepository.findById(id).orElseThrow(() -> new ChatNotFoundException());
            chat.checkMsg();
        });
    }


}
