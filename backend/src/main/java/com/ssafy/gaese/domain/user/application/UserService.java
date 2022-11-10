package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.friends.application.FriendService;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FriendSocketService friendSocketService;
    private final FriendService friendService;

    @Transactional
    public UserDto modify(UserDto userDto, long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("not found user"));

        System.out.println("user입니다 "+user);
        System.out.println("userDto입니다 "+userDto.toString());
        // 나갔다는 것을 알림
        UserDto saved = user.update(userDto.getNickname(), userDto.getProfileChar()).toDto();
        friendSocketService.refreshFriend(userId);
        return saved;

    }

    @Transactional
    public boolean delete(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) return false;
        User findUser = user.get();


        // 유저 삭제하기 전에 미리 리스트 저장 해둠
        List<FriendDto> friends = friendService.getFriends(userId);

        // 유저 삭제
        userRepository.delete(findUser);

        // 저장해둔 친구들 친구목록 리프레쉬
        friends.forEach(friend ->{
            friendSocketService.findFriendList(friend.getId());
        });
        return true;
    }

    public boolean isDuplicated(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if(!user.isPresent()) return false;
        return true;
    }
}
