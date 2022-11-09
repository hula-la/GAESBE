package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRankDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomPassDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomRedisDto;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepository;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepositoryCustom;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRoomPassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlgoSocketService {

    private final AlgoRoomPassRepository algoRoomPassRepository;
    private final AlgoRedisRepository algoRedisRepository;
    private final RedisTemplate redisTemplate;

    public AlgoRoomPassDto getRoomPass(String roomCode){
        return algoRoomPassRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException());
    }

    public void setProblemNo(String roomCode){
        AlgoRoomPassDto algoRoomPassDto =algoRoomPassRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException());

        if(algoRoomPassDto.getNowNo()== 9) return;

        algoRoomPassDto.setNowNo((algoRoomPassDto.getNowNo())+1);
        algoRoomPassDto.setPass(false);
        algoRoomPassRepository.save(algoRoomPassDto);

    }
    public void setProblemPass(String roomCode){
        AlgoRoomPassDto algoRoomPassDto = algoRoomPassRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException());
        algoRoomPassDto.setPass(true);
        algoRoomPassRepository.save(algoRoomPassDto);
        System.out.println("[service] pass 변경");
    }


    public AlgoRoomPassDto createAlgoRoomPass(String roomCode){
        AlgoRoomPassDto algoRoomPassDto = new AlgoRoomPassDto(roomCode,0,false);
        algoRoomPassRepository.save(algoRoomPassDto);
        return algoRoomPassRepository.findById(roomCode).orElseThrow(()-> new NoSuchElementException());
    }

    public List<AlgoRankDto> getCurrentRank(String roomCode){
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(roomCode).orElseThrow(()-> new NoSuchElementException());

        Set<ZSetOperations.TypedTuple<String>> set =  zSetOperations.rangeByScoreWithScores(roomCode+"-rank",0,algoRoomRedisDto.getAlgoRoomDto().getTime());
        return set.stream().map(tuple -> AlgoRankDto.builder().roomCode(roomCode).nickName(tuple.getValue()).min(tuple.getScore()+"").build()).collect(Collectors.toList());
    }

    public Long getTime(String roomCode){
        AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException());
        return algoRoomRedisDto.getAlgoRoomDto().getTime();
    }


}
