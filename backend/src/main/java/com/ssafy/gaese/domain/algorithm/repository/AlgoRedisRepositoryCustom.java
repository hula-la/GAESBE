package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomRedisDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static com.ssafy.gaese.global.util.SocketUtil.roomCodeMaker;

@Repository
@RequiredArgsConstructor
public class AlgoRedisRepositoryCustom {

    private final  RedisTemplate<String,String> stringRedisTemplate;
    private final AlgoRedisRepository algoRedisRepository;


    //  Room Code 생성
    public String createCode(){

        String code = "";
        while(true){
            code = roomCodeMaker();
            ListOperations<String,String> list = stringRedisTemplate.opsForList();

            List<String> codeList  = list.range("codes",0,-1);
            System.out.println(codeList.toString());
            if(codeList.contains(code)) continue;
            break;
        }

        return code;
    }


    //  생성된 방 list
    public Iterable<AlgoRoomRedisDto>  getRooms(){
        return algoRedisRepository.findAll();

    }

    // 방 생성
    public AlgoRoomDto createRoom(AlgoRoomRedisDto algoRoomRedisDto){

        algoRedisRepository.save(algoRoomRedisDto);
        AlgoRoomRedisDto saved = algoRedisRepository.findById(algoRoomRedisDto.getRoomCode())
                .orElseThrow(()->new NoSuchElementException());

        return saved.toDto();

    }

    // 방 삭제
    public void deleteRoomUser(AlgoRoomRedisDto algoRoomRedisDto,String userBjId){
        stringRedisTemplate.delete(algoRoomRedisDto.getRoomCode()+"-user");
        stringRedisTemplate.delete(algoRoomRedisDto.getRoomCode()+"-"+userBjId);
    }

    //  방 입장
    public void enterRoom(AlgoSocketDto algoSocketDto){
        HashOperations<String,String ,String> hashOperations = stringRedisTemplate.opsForHash();

        hashOperations.put(algoSocketDto.getRoomCode()+"-user",algoSocketDto.getSessionId(), String.valueOf(algoSocketDto.getUserId()));
        hashOperations.increment("algoRoom:"+algoSocketDto.getRoomCode(),"algoRoomDto.num",1);

        stringRedisTemplate.expire(algoSocketDto.getRoomCode()+"-user",1,TimeUnit.DAYS);

    }

    // 방 나가기
    public void leaveRoom(AlgoSocketDto algoSocketDto) {
        // roomCode-user 에 사용자 정보 제거
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        System.out.println("삭제 할꺼임");
        hashOperations.delete(algoSocketDto.getRoomCode() + "-user", algoSocketDto.getSessionId());
        
        // algoRoom:roomCode 정보에 인원 수 정보 -1
        hashOperations.increment("algoRoom:" + algoSocketDto.getRoomCode(), "algoRoomDto.num", -1);
    }


    public List<String> getUserInRoom(String code){
        HashOperations<String ,String,String > hashOperations = stringRedisTemplate.opsForHash();
        Map<String,String> list = hashOperations.entries(code+"-user");
        System.out.println(list.toString());
        List<String> users = new ArrayList<>();

        for (String key : list.keySet()) {
            users.add(list.get(key));
        }

        return users;
    }

    public int getRoomNum(String roomCode){
        String num = algoRedisRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException()).getAlgoRoomDto().getNum();
        return Integer.parseInt(num);
    }

    public int getRoomNo(String roomCode){
        String no = algoRedisRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException()).getAlgoRoomDto().getNo();
        return Integer.parseInt(no);
    }
}
