package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepositoryCustom;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlgoService {

    private final AlgoRepository algoRepository;
    private final UserRepository userRepository;
    private final AlgoRedisRepositoryCustom algoRedisRepositoryCustom;

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
        return algoRedisRepositoryCustom.createRoom(code, algoRoomDto);
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
        if(algoRedisRepositoryCustom.getRoomNum(roomCode) == 5) return false;
        return true;
    }

}
