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


    public void setHashData(String key, Map<String, String[]> map){
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        hashOperations.putAll(key,map);
    }
    public Float getHashData(Long key1, Long key2){
        HashOperations<String, Object, Object> hashOperations = redisTemplate.opsForHash();
        return (Float) hashOperations.get(String.valueOf(key1),String.valueOf(key2));
    }
    public Map<String, String[]> getHashEntry(String key1){
        HashOperations<String, String, String[]> hashOperations = redisTemplate.opsForHash();
        return hashOperations.entries(String.valueOf(key1));
    }

    // 데이터 저장
    public void setData(String key, String value){
        ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    // 유효 기간 설정
    public void setDataExpire(String key, String value, long duration){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    // key를 통해 value 삭제
    public void deleteData(String key){
        redisTemplate.delete(key);
    }

    public void print(){
        Set<byte[]> keys = redisTemplate.getConnectionFactory().getConnection().keys("*".getBytes());

        Iterator<byte[]> it = keys.iterator();
        while(it.hasNext()){
            byte[] data = (byte[])it.next();
            System.out.println(new String(data, 0, data.length));
        }
    }
}
