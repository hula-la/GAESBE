package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomRedisDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.TimeUnit;

import static com.ssafy.gaese.global.util.SocketUtil.roomCodeMaker;

@Repository
@RequiredArgsConstructor
public class AlgoRedisRepositoryCustom {

//    @Autowired
//    private RedisTemplate<String,AlgoRoomDto> redisAlgoTemplate;
    @Autowired
    private RedisTemplate<String,String> stringRedisTemplate;

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
            list.rightPush("codes",code);
            list.rightPush("algoCodes",code);
            break;
        }
        stringRedisTemplate.expire("codes",1, TimeUnit.DAYS);
        stringRedisTemplate.expire("algoCodes",1, TimeUnit.DAYS);

        return code;
    }

    //  Room Code 삭제
    public Long deleteCode(String code){
        ListOperations<String,String > listOperations = stringRedisTemplate.opsForList();
        if(listOperations.remove("algoCodes",1,code) == 1 ){
            return listOperations.remove("codes",1,code);
        }
        return -1l;
    }

    //  생성된 방 list
    public List<AlgoRoomDto> getRooms(){

        List<String> roomCodeList = stringRedisTemplate.opsForList().range("algoCodes",0,-1);
        List<AlgoRoomDto> roomList = new ArrayList<>();
        Iterable<AlgoRoomRedisDto> algoRoomRedisDtos = algoRedisRepository.findAll();
        for(AlgoRoomRedisDto algoRoomRedisDto : algoRoomRedisDtos) {
            System.out.println(algoRoomRedisDto.toString());
            roomList.add(algoRoomRedisDto.toDto());
        }
//        for(String roomCode : roomCodeList){
//            HashOperations<String,String,String > hashOperations = stringRedisTemplate.opsForHash();
//            Map<String, String> map = hashOperations.entries(roomCode);
//            AlgoRoomDto algoRoomDto = new AlgoRoomDto(map.get("code"),map.get("time")
//                    ,map.get("tier"), map.get("num"), map.get("no"));
//            roomList.add(algoRoomDto);
//        }
        return roomList;

    }

    // 방 생성
    public AlgoRoomDto createRoom(AlgoRoomRedisDto algoRoomRedisDto){

        algoRedisRepository.save(algoRoomRedisDto);
//        hashOperations.put(code,"code",code);
//        hashOperations.put(code,"time", algoRoomDto.getTime());
//        hashOperations.put(code,"tier",algoRoomDto.getTier());
//        hashOperations.put(code,"num",algoRoomDto.getNum());
//
//        stringRedisTemplate.expire(code,1, TimeUnit.DAYS);

        AlgoRoomRedisDto saved = algoRedisRepository.findById(algoRoomRedisDto.getRoomCode())
                .orElseThrow(()->new NoSuchElementException());
        System.out.println(saved.toString());
        return saved.toDto();

    }

    //  방 입장
    public List<String> enterRoom(AlgoSocketDto algoSocketDto){
        stringRedisTemplate.expire(algoSocketDto.getRoomCode()+"user",1,TimeUnit.DAYS);
        HashOperations<String ,String,String > hashOperations = stringRedisTemplate.opsForHash();
        hashOperations.put(algoSocketDto.getRoomCode()+"user",algoSocketDto.getUserId(),algoSocketDto.getSessionId());
        return getUserInRoom(algoSocketDto.getRoomCode());
    }

    // 방 나가기
    public List<String> leaveRoom(AlgoSocketDto algoSocketDto){
        HashOperations<String ,String, String > hashOperations = stringRedisTemplate.opsForHash();

        hashOperations.delete(algoSocketDto.getRoomCode()+"user", algoSocketDto.getUserId());
        hashOperations.increment(algoSocketDto.getRoomCode(),"num",-1);

        return getUserInRoom(algoSocketDto.getRoomCode());
    }

    // 방 삭제
    public Long deleteRoom(String code){
        stringRedisTemplate.delete(code);
        stringRedisTemplate.delete(code+"user");
        return deleteCode(code);
    }

    public List<String> getUserInRoom(String code){
        HashOperations<String ,String,String > hashOperations = stringRedisTemplate.opsForHash();
        Map<String,String> list = hashOperations.entries(code+"user");
        List<String> users = new ArrayList<>();

        for (String key : list.keySet()) {
            users.add(key);
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
