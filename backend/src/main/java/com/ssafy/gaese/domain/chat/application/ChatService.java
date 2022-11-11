package com.ssafy.gaese.domain.chat.application;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.entity.Chat;
import com.ssafy.gaese.domain.chat.entity.ChatUser;
import com.ssafy.gaese.domain.chat.repository.ChatRepository;
import com.ssafy.gaese.domain.chat.repository.ChatUserRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatUserRepository chatUserRepository;
    private final UserRepository userRepository;

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
    public void checkSend(Long from, Long to){
        User fromUser = userRepository.findById(from).orElseThrow(()->new UserNotFoundException());
        User toUser =  userRepository.findById(from).orElseThrow(()->new UserNotFoundException());
        Optional<ChatUser> opt = chatUserRepository.findByFromUserAndToUser(fromUser,toUser);
        if(opt.isPresent()){
            ChatUser chatUser = opt.get();
            ChatUser update = ChatUser.builder()
                    .toUser(toUser)
                    .fromUser(fromUser)
                    .open(chatUser.isOpen())
                    .id(chatUser.getId())
                    .wait(true)
                    .open(chatUser.isOpen())
                    .build();
            chatUserRepository.save(update);
        }else{
            ChatUser update = ChatUser.builder()
                    .fromUser(fromUser)
                    .toUser(toUser)
                    .open(false)
                    .wait(true)
                    .open(false)
                    .build();
            chatUserRepository.save(update);
        }
    }
    // open 표시
    public void setOpen(Long from, Long to){
        User fromUser = userRepository.findById(from).orElseThrow(()->new UserNotFoundException());
        User toUser =  userRepository.findById(to).orElseThrow(()->new UserNotFoundException());
        Optional<ChatUser> opt = chatUserRepository.findByFromUserAndToUser(fromUser,toUser);
        if(opt.isPresent()){
            ChatUser chatUser = opt.get();
            ChatUser update = ChatUser.builder()
                    .toUser(toUser)
                    .fromUser(fromUser)
                    .open(chatUser.isOpen())
                    .id(chatUser.getId())
                    .wait(true)
                    .open(chatUser.isOpen())
                    .build();
            chatUserRepository.save(update);
        }else{
            ChatUser update = ChatUser.builder()
                    .fromUser(fromUser)
                    .toUser(toUser)
                    .open(false)
                    .wait(true)
                    .open(false)
                    .build();
            chatUserRepository.save(update);
        }
    }
}
