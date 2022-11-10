package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FriendSocketService friendSocketService;

    @Transactional
    public UserDto modify(UserDto userDto, long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("not found user"));

        System.out.println("user입니다 "+user);
        System.out.println("userDto입니다 "+userDto.toString());
        // 나갔다는 것을 알림
        friendSocketService.refreshFriend(userId);
        return user.update(userDto.getNickname(), userDto.getProfileChar()).toDto();

    }

    @Transactional
    public boolean delete(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) return false;
        User findUser = user.get();
        userRepository.delete(findUser);
        // 나갔다는 것을 알림
        friendSocketService.refreshFriend(userId);
        return true;
    }

    public boolean isDuplicated(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);
        if(!user.isPresent()) return false;
        return true;
    }
}
