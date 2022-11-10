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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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
//            list.rightPush("codes",code);
//            list.rightPush("algoCodes",code);
            break;
        }
//        stringRedisTemplate.expire("codes",1, TimeUnit.DAYS);
//        stringRedisTemplate.expire("algoCodes",1, TimeUnit.DAYS);

        return code;
    }

    //  Room Code 삭제
//    public Long deleteCode(String code){
//        ListOperations<String,String > listOperations = stringRedisTemplate.opsForList();
//        if(listOperations.remove("algoCodes",1,code) == 1 ){
//            return listOperations.remove("codes",1,code);
//        }
//        return -1l;
//    }

    //  생성된 방 list
    public List<AlgoRoomDto> getRooms(){

        List<AlgoRoomDto> roomList = new ArrayList<>();
        Iterable<AlgoRoomRedisDto> algoRoomRedisDtos = algoRedisRepository.findAll();
        for(AlgoRoomRedisDto algoRoomRedisDto : algoRoomRedisDtos) {
            System.out.println("========== 사용자 get  ==========");
            System.out.println(algoRoomRedisDto.toString());
            roomList.add(algoRoomRedisDto.toDto());
        }
        return roomList;

    }

    // 방 생성
    public AlgoRoomDto createRoom(AlgoRoomRedisDto algoRoomRedisDto){

        algoRedisRepository.save(algoRoomRedisDto);
//        hashOperations.put(code,"code",code);
//        hashOperations.put(code,"time", algoRoomDto.getTime());
//        hashOperations.put(code,"tier",algoRoomDto.getTier());
//        hashOperations.put(code,"num",algoRoomDto.getNum());
//        stringRedisTemplate.expire(code,1, TimeUnit.DAYS);

        AlgoRoomRedisDto saved = algoRedisRepository.findById(algoRoomRedisDto.getRoomCode())
                .orElseThrow(()->new NoSuchElementException());
        System.out.println(" =========== 사용자 저장 =========== ");
        System.out.println(saved.toString());
        return saved.toDto();

    }

    // 방 삭제
    public void deleteRoomUser(AlgoRoomRedisDto algoRoomRedisDto){
        stringRedisTemplate.delete(algoRoomRedisDto.getRoomCode()+"-user");
        stringRedisTemplate.delete(algoRoomRedisDto.getRoomCode());
    }

    //  방 입장
    public void enterRoom(AlgoSocketDto algoSocketDto){
        HashOperations<String,String ,String> hashOperations = stringRedisTemplate.opsForHash();

        hashOperations.put(algoSocketDto.getRoomCode()+"-user",algoSocketDto.getSessionId(),algoSocketDto.getUserId());
        hashOperations.increment("algoRoom:"+algoSocketDto.getRoomCode(),"algoRoomDto.num",1);

        stringRedisTemplate.expire(algoSocketDto.getRoomCode()+"-user",1,TimeUnit.DAYS);

    }

    // 방 나가기
    public void leaveRoom(AlgoSocketDto algoSocketDto) {

        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        hashOperations.delete(algoSocketDto.getRoomCode() + "-user", algoSocketDto.getSessionId());
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
