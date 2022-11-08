package com.ssafy.gaese.domain.typing.service;

import com.ssafy.gaese.domain.typing.repository.TypingUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TypingUserService {

    @Autowired
    StringRedisTemplate redisTemplate;
    private final TypingUserRepository typingUserRepository;


}
