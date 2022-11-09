package com.ssafy.gaese.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisUtil {
    private final RedisTemplate redisTemplate;
    // key를 통해 value 리턴

    public boolean isExists(String key){
        return redisTemplate.hasKey(key);
    }

    public String getData(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public Set<String> getSetData(String key){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        return setOperations.members(key);
    }

    public Long addSetData(String key, String value){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        return setOperations.add(key,value);
    }

    public Long removeSetData(String key, String value){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        return setOperations.remove(key,value);
    }
    public Boolean isExistSetData(String key, String value){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        return setOperations.isMember(key,value);
    }

}
