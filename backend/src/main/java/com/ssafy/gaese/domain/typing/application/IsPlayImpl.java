package com.ssafy.gaese.domain.typing.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class IsPlayImpl implements IsPlay{

    @Autowired
    StringRedisTemplate redisTemplate;
    final static String key ="isPlay";



    public boolean isPlayCheck(String nickName)
    {

        SetOperations<String, String> stringStringSetOperations = redisTemplate.opsForSet();
        return stringStringSetOperations.isMember(key,nickName);
    }

    public void isPlaySet(String nickName)
    {

        SetOperations<String, String> stringStringSetOperations = redisTemplate.opsForSet();
        stringStringSetOperations.add(key, nickName);
    }

    public boolean isPlayDel(String nickName)
    {
        SetOperations<String, String> stringStringSetOperations = redisTemplate.opsForSet();

        if(stringStringSetOperations.isMember(key,nickName))
        {
            stringStringSetOperations.remove(key, nickName);
            return true;
        }

        return stringStringSetOperations.isMember(key,nickName);
    }
}
