package com.ssafy.gaese.domain.typing.template;

import com.ssafy.gaese.domain.typing.application.TypingUserApp;
import com.ssafy.gaese.domain.typing.common.TypingStaticData;
import com.ssafy.gaese.domain.typing.dto.TypingRoom;
import com.ssafy.gaese.domain.typing.dto.TypingUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class TypingRoomTempl {

    final static String key = "Typing";
    @Autowired
    RedisTemplate redisTemplate;





}
