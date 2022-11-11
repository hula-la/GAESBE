package com.ssafy.gaese.domain.chat.application;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.chat.dto.ChatSocketDto;
import com.ssafy.gaese.domain.chat.dto.ChatUserDto;
import com.ssafy.gaese.domain.chat.dto.ChatWaitDto;
import com.ssafy.gaese.domain.chat.entity.Chat;
import com.ssafy.gaese.domain.chat.entity.ChatUser;
import com.ssafy.gaese.domain.chat.repository.ChatRepository;
import com.ssafy.gaese.domain.chat.repository.ChatUserRepository;
import com.ssafy.gaese.domain.friends.application.FriendService;
import com.ssafy.gaese.domain.friends.repository.FriendRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatUserRepository chatUserRepository;
    private final UserRepository userRepository;
    private final FriendService friendService;

    public void createChatUser(User me, User friend){
        ChatUser chatUser1 = ChatUser.builder()
                .open(false)
                .wait(false)
                .me(me)
                .friend(friend)
                .build();
        ChatUser chatUser2 = ChatUser.builder()
                .open(false)
                .wait(false)
                .me(friend)
                .friend(me)
                .build();
        chatUserRepository.save(chatUser1);
        chatUserRepository.save(chatUser2);
    }
    //메시지 저장
    public ChatDto saveMsg(ChatDto chatDto){
        chatDto.setDate();
        Chat saved = chatRepository.save(chatDto.toEntity());
        return saved.toDto();
    }

    // 메시지 불러오기
    public List<ChatDto> getMsg(Long from, Long to){
        List<ChatDto> chatDtoList = chatRepository.findAllByFromIdAndToId(from,to).stream().map(chat -> chat.toDto()).collect(Collectors.toList());
        chatDtoList.addAll(chatRepository.findAllByFromIdAndToId(to,from).stream().map(chat -> chat.toDto()).collect(Collectors.toList()));
        return chatDtoList;
    }

    public void enterUser(ChatSocketDto chatSocketDto){
        User me = userRepository.findById(chatSocketDto.getMyId()).orElseThrow(()-> new UserNotFoundException());
        User friend = userRepository.findById(chatSocketDto.getFriendId()).orElseThrow(()-> new UserNotFoundException());
        Optional<ChatUser> opt = chatUserRepository.findByFriendAndMe(friend,me);
//        ChatUser user = chatUserRepository.findByFriendAndMe(friend,me);
//        System.out.println(user.toDto());
        if(opt.isPresent()) {
            ChatUser saved = opt.get();
            ChatUser update = ChatUser.builder()
                    .id(saved.getId())
                    .open(true)
                    .wait(false)
                    .me(me)
                    .friend(friend).build();
            chatUserRepository.save(update);
        }else {
            createChatUser(me,friend);
        }



    }
    public void leaveUser(ChatSocketDto chatSocketDto){
        checkOpen(chatSocketDto.getMyId(),chatSocketDto.getFriendId());
        chatUserRepository.updateWait(chatSocketDto.getMyId(),chatSocketDto.getFriendId(), false);
        chatUserRepository.updateOpen(chatSocketDto.getMyId(),chatSocketDto.getFriendId(), false);
        checkOpen(chatSocketDto.getMyId(),chatSocketDto.getFriendId());
    }

    //요청 표시 상대방의 wait 업데이트
    public void updateWait(Long myId, Long friendId, boolean state){
        chatUserRepository.updateWait(myId, friendId, state);

    }


    public boolean checkOpen(Long myId, Long friendId){
        User me = userRepository.findById(myId).orElseThrow(()-> new UserNotFoundException());
        User friend = userRepository.findById(friendId).orElseThrow(()-> new UserNotFoundException());
        ChatUser chatUser = chatUserRepository.findByFriendAndMe(friend,me).orElseThrow(()->new NoSuchElementException());
        System.out.println("checkOpen"+chatUser.toDto());
        return chatUser.isOpen();
    }


    public List<ChatWaitDto> waitList(Long myId){
        List<ChatWaitDto> waitList = new ArrayList<>();
        friendService.getFriends(myId).stream().map(friend->
            waitList.add(
                    ChatWaitDto.builder()
                    .friendId(friend.getId())
                    .wait(chatUserRepository.findByMe_IdAndFriend_Id(myId,friend.getId()).isWait())
                    .build())).collect(Collectors.toList());
        return waitList;
    }
}
