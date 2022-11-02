package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.cs.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Modifying
    public UserDto modify(UserDto userDto, long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("not found user"));

        System.out.println("user입니다 "+user);
        System.out.println("userDto입니다 "+userDto.toString());
        return user.update(userDto.getNickname(), userDto.getProfileChar()).toDto();

    }

    @Transactional
    public boolean delete(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent()) return false;
        User findUser = user.get();
        userRepository.delete(findUser);
        return true;
    }
}
