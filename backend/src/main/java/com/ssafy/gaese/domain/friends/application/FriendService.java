package com.ssafy.gaese.domain.friends.application;

import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.friends.repository.FriendRepository;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springfox.documentation.swagger2.mappers.ModelMapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserRepository userRepository;



    public void saveFriend(Long userId, Long friendId) throws NullPointerException{
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());
        User friend = userRepository.findById(friendId).orElseThrow(()->new UserNotFoundException());

        User firstuser = null;
        User seconduser = null;

        if(userId > friendId){
             firstuser = user;
             seconduser = friend;
        } else {
            firstuser = friend;
            seconduser = user;
        }


        if( !(friendRepository.existsByFirstUserAndSecondUser(firstuser,seconduser))){
            Friends friendShip = Friends.builder()
                    .createdDate(new Date())
                    .firstUser(firstuser)
                    .secondUser(seconduser)
                    .build();
            friendRepository.save(friendShip);
        }
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

}