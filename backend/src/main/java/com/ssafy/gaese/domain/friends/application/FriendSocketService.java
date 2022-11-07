package com.ssafy.gaese.domain.friends.application;

import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.dto.FriendSocketDto;
import com.ssafy.gaese.domain.friends.dto.OnlineUserDto;
import com.ssafy.gaese.domain.friends.entity.FriendRequest;
import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.friends.repository.FriendRepository;
import com.ssafy.gaese.domain.friends.repository.OnlineUserRedisRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class FriendSocketService {

    private final OnlineUserRedisRepository onlineUserRedisRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final FriendService friendService;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final SocketInfo socketInfo;

    public void findFriendList(Long userId){
        List<FriendDto> friends = friendService.getFriends(userId);
        HashMap<String, Object> res = new HashMap<>();

        // 온라인, 오프라인 친구 리스트
        List<FriendDto> onlineList = new ArrayList<>();
        List<FriendDto> offlineList = new ArrayList<>();

        friends.forEach(friend ->{
            Optional<OnlineUserDto> onlineFriendOpt = onlineUserRedisRepository.findById(friend.getId());

            // 온라인인 친구면
            if (onlineFriendOpt.isPresent()) onlineList.add(friend);
            else offlineList.add(friend);

        });
        res.put("online", onlineList);
        res.put("offline", offlineList);

        simpMessagingTemplate.convertAndSend("/friend/"+userId,res);
    }

    public void refreshFriend(Long userId){

        List<FriendDto> friends = friendService.getFriends(userId);


        // 친구들에게 친구목록 리프레쉬하라는 메시지 보냄
        friends.forEach(friend ->{
            findFriendList(friend.getId());
        });
    }
    public void userEnter(FriendSocketDto friendSocketDto){
        Long userId = friendSocketDto.getUserId();

        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
        onlineUserRedisRepository.save(OnlineUserDto.builder()
                .nickname(user.getNickname())
                .profileChar(user.getProfileChar())
                .sessionId(friendSocketDto.getSessionId())
                .id(user.getId())
                .build());

        socketInfo.setSocketInfo(friendSocketDto.getSessionId(),
                friendSocketDto.getUserId().toString(),
                null,
                "Friend",
                null);

        // 들어왔다는 것을 알림
        refreshFriend(userId);
    }

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

        // 친구 추가 한 후에 온라인/오프라인 리스트 리프레쉬
        findFriendList(userId);
        findFriendList(friendId);

    }

    public void userLeave(FriendSocketDto friendSocketDto){
        Long userId = friendSocketDto.getUserId();

        onlineUserRedisRepository.deleteById(friendSocketDto.getUserId());

        // 나갔다는 것을 알림
        refreshFriend(userId);
    }

}
