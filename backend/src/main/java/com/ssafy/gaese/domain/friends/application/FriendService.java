package com.ssafy.gaese.domain.friends.application;

import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.dto.FriendRequestDto;
import com.ssafy.gaese.domain.friends.entity.FriendRequest;
import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.friends.exception.AlreadyFriendRequestException;
import com.ssafy.gaese.domain.friends.repository.FriendRepository;
import com.ssafy.gaese.domain.friends.repository.FriendRequestRepository;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.exception.UserSameException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import springfox.documentation.swagger2.mappers.ModelMapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;



    public boolean requestFriend(Long userId, String targetNickname) throws NullPointerException{

        User targetUser = userRepository.findByNickname(targetNickname).orElseThrow(()->new UserNotFoundException());

        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());

        if (targetNickname.equals(user)) return false;

        if( !(friendRequestRepository.existsByRequestUserAndTargetUser(user,targetUser))){
            FriendRequest friendRequest = FriendRequest.builder()
                    .targetUser(targetUser)
                    .requestUser(user)
                    .createdDate(new Date())
                    .build();
            friendRequestRepository.save(friendRequest);
        } else {
            throw new AlreadyFriendRequestException();
        }
        return true;
    }

    public List<FriendRequestDto> getRequestFriend(Long userId) throws NullPointerException{
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());
        List<FriendRequestDto> friendRequestList = friendRequestRepository
                .findByTargetUser(user).stream()
                .map(FriendRequest::toDto)
                .collect(Collectors.toList());

        return friendRequestList;
    }


    public List<FriendDto> getFriends(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());

        List<Friends> friendsByFirstUser = friendRepository.findByFirstUser(user);
        List<Friends> friendsBySecondUser = friendRepository.findBySecondUser(user);

        // 전체 친구 리스트
        List<User> friendUsers = new ArrayList<>();


        for (Friends friend : friendsByFirstUser) {
            friendUsers.add(userRepository.findById(friend.getSecondUser()
                            .getId())
                    .orElseThrow(()->new UserNotFoundException()));
        }
        for (Friends friend : friendsBySecondUser) {
            friendUsers.add(userRepository.findById(friend.getFirstUser()
                            .getId())
                    .orElseThrow(()->new UserNotFoundException()));
        }
        return friendUsers.stream().map(User::toFriendDto).collect(Collectors.toList());

    }

    public List<FriendRequestDto> delRequest(Long userId, Long reqId){
        friendRequestRepository.deleteById(reqId);

        return getRequestFriend(userId);

    }

}