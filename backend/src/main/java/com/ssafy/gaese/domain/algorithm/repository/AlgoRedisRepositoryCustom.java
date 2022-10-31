package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AlgoRedisRepositoryCustom {

    @Autowired
    private RedisTemplate<String,AlgoRoomDto> redisAlgoTemplate;
    @Autowired
    private RedisTemplate<String,String> stringRedisTemplate;

    public List<AlgoRoomDto> getRooms(){
        List<String> roomList = stringRedisTemplate.opsForList().range("algoCodes",0,-1);
        List<AlgoRoomDto> map = new ArrayList<>();
        for(String roomCode : roomList){
            HashOperations<String,String,String > hashOperations = stringRedisTemplate.opsForHash();

        }
        return null;
    }

}
