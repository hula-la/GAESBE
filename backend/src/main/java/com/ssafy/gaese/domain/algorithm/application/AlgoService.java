package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.*;
import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepository;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepositoryCustom;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRepository;
import com.ssafy.gaese.domain.cs.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlgoService {

    private final AlgoRepository algoRepository;
    private final UserRepository userRepository;
    private final AlgoRedisRepositoryCustom algoRedisRepositoryCustom;
    private final AlgoRedisRepository algoRedisRepository;
    private final RedisTemplate<String,String> redisTemplate;

    public AlgoRecordDto createAlgoRecord(AlgoRecordDto algoRecordDto, Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
        algoRepository.save(algoRecordDto.toEntity(user));
        return algoRecordDto;
    }

    public Page<AlgoRecordDto> recordList(Pageable pageable, Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
        Page<AlgoRecord> algoRecords = algoRepository.findByUser(user,  pageable);
        return algoRecords.map(algoRecord -> algoRecord.toDto());
    }


    public Long deleteCode(String code){
        return algoRedisRepositoryCustom.deleteCode(code);
    }

    public List<AlgoRoomDto> getRooms(){
        return algoRedisRepositoryCustom.getRooms();
    }

    public AlgoRoomDto createRoom(AlgoRoomDto algoRoomDto){
        String code = algoRedisRepositoryCustom.createCode();
        AlgoRoomRedisDto algoRoomRedisDto = algoRoomDto.toRedisDto(code);
        AlgoUserRedisDto algoUserRedisDto = new AlgoUserRedisDto(algoRoomDto.getMaster());
        algoRoomRedisDto.addUser(algoUserRedisDto);

        System.out.println(" =========== 사용자 확인 =========== ");
        System.out.println(algoRoomRedisDto.getUsers().toString());
        return algoRedisRepositoryCustom.createRoom(algoRoomDto.toRedisDto(code));
    }

    public List<String> enterRoom(AlgoSocketDto algoSocketDto){
        return algoRedisRepositoryCustom.enterRoom(algoSocketDto);
    }

    public List<String> leaveRoom(AlgoSocketDto algoSocketDto){
        return algoRedisRepositoryCustom.leaveRoom(algoSocketDto);
    }

    public Long deleteRoom(String code){
        return algoRedisRepositoryCustom.deleteRoom(code);
    }

    public Boolean confirmRoomEnter(String roomCode){
        System.out.println(algoRedisRepositoryCustom.getRoomNum(roomCode));
        if(algoRedisRepositoryCustom.getRoomNum(roomCode) == 4) return false;
        return true;
    }

    public List<UserDto> getUsers(List<String> userIds){
        return userRepository.findUsersByIds(userIds.stream().map(id->Long.parseLong(id)).collect(Collectors.toList())).stream().map(
                user -> user.toDto()).collect(Collectors.toList());
    }

    public int getRoomNo(String roomCode){
        return algoRedisRepositoryCustom.getRoomNo(roomCode);
    }

}
