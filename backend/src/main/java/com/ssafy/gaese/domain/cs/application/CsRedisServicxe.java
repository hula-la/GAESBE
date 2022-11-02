package com.ssafy.gaese.domain.cs.application;

import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.cs.dto.UserDto;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.cs.repository.CsRoomRedisRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CsRedisServicxe {

//    @Autowired
//    private RedisTemplate<String,AlgoRoomDto> redisAlgoTemplate;
    private final StringRedisTemplate stringRedisTemplate;

    private final CsRoomRedisRepository csRoomRedisRepository;
    private final UserRepository userRepository;
    //  Room Code 생성

    //  생성된 방 list

    // 방 생성
    // 해시로 저장
    public CsRoomDto createRoom(){

        CsRoomDto csRoomDto = CsRoomDto.create();

        CsRoomDto savedRoom = csRoomRedisRepository.save(csRoomDto);

        return savedRoom;
    }

    //  방 입장
    public List<UserDto> enterRoom(CsSocketDto csSocketDto){
        CsRoomDto csRoom = csRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        HashMap<Long, String> players = csRoom.getPlayers();
        players.put(csSocketDto.getUserId(),csSocketDto.getSessionId());

        return getUserInRoom(csSocketDto.getRoomCode());
    }

    // 방 나가기
    public List<UserDto> leaveRoom(CsSocketDto csSocketDto){
        CsRoomDto csRoom = csRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        HashMap<Long, String> players = csRoom.getPlayers();
        players.remove(new Object[]{csSocketDto.getUserId(),csSocketDto.getSessionId()});

        return getUserInRoom(csSocketDto.getRoomCode());
    }

    // 방 삭제
    public boolean deleteRoom(String roomId){
        csRoomRedisRepository.deleteById(roomId);
        return true;
    }

    public List<UserDto> getUserInRoom(String roomId){
        CsRoomDto room = csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());

        List<UserDto> playerList = room.getPlayers().keySet().stream()
                .map(id->userRepository.findById(id).orElseThrow(()->new RoomNotFoundException()).toDto())
                .collect(Collectors.toList());
        return playerList;
    }

}
