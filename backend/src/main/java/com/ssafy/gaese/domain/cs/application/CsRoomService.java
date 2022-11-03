package com.ssafy.gaese.domain.cs.application;

import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.exception.ExceedMaxPlayerException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.cs.repository.CsProblemRepository;
import com.ssafy.gaese.domain.cs.repository.CsRoomRedisRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CsRoomService {

    private final CsRoomRedisRepository csRoomRedisRepository;
    private final UserRepository userRepository;
    private final CsService csService;
    private final RedisUtil redisUtil;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final int maxPlayer=10;

    private final String waitRoomKey="WaitRoom";

    public void enterOrLeave(CsSocketDto csSocketDto) throws InterruptedException {
        CsRoomDto roomDto=null;
        Map<String,Object> res = new HashMap<>();

        // 방 입장
        if(csSocketDto.getType() == CsSocketDto.Type.ENTER){
            if (csSocketDto.getRoomCode()!=null) roomDto = enterRoom(csSocketDto);
            else roomDto = enterRandomRoom(csSocketDto);

            res.put("msg",csSocketDto.getUserId()+"님이 접속하셨습니다.");
        }
        // 방 나가기
        else if(csSocketDto.getType() == CsSocketDto.Type.LEAVE){
            roomDto = leaveRoom(csSocketDto);
            res.put("msg",csSocketDto.getUserId()+"님이 나가셨습니다.");

        }

        res.put("players",getUserInRoom(roomDto.getCode()));
        simpMessagingTemplate.convertAndSend("/cs/room/"+csSocketDto.getRoomCode(),res);

        // 플레이어가 꽉 차면 게임 시작
        boolean isStart = isReadyToStart(roomDto);

        if (isStart)csService.gameStart(roomDto);

    }

    // 방 생성
    // 해시로 저장
    public CsRoomDto createRoom(){

        CsRoomDto csRoomDto = CsRoomDto.create();

        CsRoomDto savedRoom = csRoomRedisRepository.save(csRoomDto);

        // 방만든 후에 대기 방에 넣음
        redisUtil.addSetData(waitRoomKey,savedRoom.getCode());

        return savedRoom;
    }

    //  랜덤 방 입장
    public synchronized CsRoomDto enterRandomRoom(CsSocketDto csSocketDto){
        List<String> waitRooms = new ArrayList<>(redisUtil.getSetData(waitRoomKey));
        Collections.shuffle(waitRooms);

        String roomIdToEnter = null;

        for (String room:waitRooms){
            Optional<CsRoomDto> roomInfoOpt = csRoomRedisRepository.findById(room);

            // 방이 안찾아지면 다음으로
            if (roomInfoOpt.isEmpty()) continue;
            // 인원이 가득차면 다음으로

            CsRoomDto csRoom = roomInfoOpt.get();
            HashMap<String, Long> players = csRoom.getPlayers();
            if (players.size()>=maxPlayer) continue;

            // 방이 가득 안찼으면 player에 추가하고 변경된 정보 저장
            roomIdToEnter = csRoom.getCode();
            break;
        }

        // 들어갈 곳이 없으면 새로운 방 생성
        if (roomIdToEnter==null){
            roomIdToEnter = createRoom().getCode();
        }

        csSocketDto.setRoomCode(roomIdToEnter);

        CsRoomDto csRoomDto = enterRoom(csSocketDto);
        return csRoomDto;
    }

    // 친선전 방 입장
    public synchronized CsRoomDto enterRoom(CsSocketDto csSocketDto){
        CsRoomDto csRoom = csRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        HashMap<String, Long> players = csRoom.getPlayers();

        // 방이 가득찼다면 예외 날림
        if (players.size()>=maxPlayer) throw new ExceedMaxPlayerException();

        // 방이 가득 안찼으면 player에 추가하고 변경된 정보 저장
        players.put(csSocketDto.getSessionId(),csSocketDto.getUserId());

        CsRoomDto saved = csRoomRedisRepository.save(csRoom);

        return saved;
    }

    // 방 나가기
    public CsRoomDto leaveRoom(CsSocketDto csSocketDto){
        CsRoomDto csRoom = csRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        HashMap<String, Long> players = csRoom.getPlayers();
        players.remove(csSocketDto.getSessionId());

        // 바뀐 방 정보로 저장
        CsRoomDto saved = csRoomRedisRepository.save(csRoom);

        return saved;
    }

    // 방 삭제 (게임 끝나면 방 삭제)
    public boolean deleteRoom(String roomId){
        csRoomRedisRepository.deleteById(roomId);
        return true;
    }

    // 방에 있는 유저리스트 정보 조회
    public List<UserDto> getUserInRoom(String roomId){
        CsRoomDto room = csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());

        List<UserDto> playerList = room.getPlayers().values().stream()
                .map(id->userRepository.findById(id).orElseThrow(()->new RoomNotFoundException()).toDto())
                .collect(Collectors.toList());
        return playerList;
    }

    public boolean isReadyToStart(CsRoomDto csRoom){

        HashMap<String, Long> players = csRoom.getPlayers();

        // 인원 안차면 시작 안함
        if (players.size()!=maxPlayer) return false;
        // 게임 시작하면 list에서 삭제
        redisUtil.removeSetData(waitRoomKey,csRoom.getCode());
        return true;
    }

}
