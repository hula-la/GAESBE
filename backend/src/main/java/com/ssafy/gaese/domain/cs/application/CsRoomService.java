package com.ssafy.gaese.domain.cs.application;

import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.exception.ExceedMaxPlayerException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.cs.repository.CsProblemRepository;
import com.ssafy.gaese.domain.cs.repository.CsRoomRedisRepository;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.redis.SocketInfo;
import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Log4j2
public class CsRoomService {

    private final RedisUtil redisUtil;
    private final CsRoomRedisRepository csRoomRedisRepository;
    private final UserRepository userRepository;
    private final CsProblemRepository csProblemRepository;

    private final CsService csService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final SocketInfo socketInfo;

    private final int maxPlayer=2;
    private final int numProblem=3;

    private final String waitRoomKey="WaitRoom";

    public void enterOrLeave(CsSocketDto csSocketDto) throws InterruptedException {
        CsRoomDto roomDto=null;
        Map<String,Object> res = new HashMap<>();
        Map<String,Object> roomResByUser = new HashMap<>();

        // 방 입장
        if(csSocketDto.getType() == CsSocketDto.Type.ENTER){


            // 랜덤방 들어가기
            if (csSocketDto.getRoomType()!= CsSocketDto.RoomType.FRIEND) roomDto = enterRandomRoom(csSocketDto);
            // 친선전 들어가기
            else {
                // 방만들기
                if (csSocketDto.getRoomCode()==null){
                    roomDto = enterMyRoom(csSocketDto);
                }
                // 만들어져있는 방 들어가기기
               else{
                    roomDto = enterRoom(csSocketDto);
                }
            }

            socketInfo.setSocketInfo(csSocketDto.getSessionId(),
                    csSocketDto.getUserId().toString(),
                    csSocketDto.getRoomCode(),
                    "Cs",
                    null);

            log.debug(csSocketDto.getUserId()+"님이"+roomDto.getCode()+"방에 입장하였습니다.");
            res.put("msg",csSocketDto.getUserId()+"님이 접속하셨습니다.");
        }
        // 방 나가기
        else if(csSocketDto.getType() == CsSocketDto.Type.LEAVE){
            roomDto = leaveRoom(csSocketDto);
            log.debug(csSocketDto.getUserId()+"님이"+roomDto.getCode()+"방에서 나갔습니다.");
            res.put("msg",csSocketDto.getUserId()+"님이 나가셨습니다.");

        }


        // 방 코드를 개인에게 전달
        roomResByUser.put("room",roomDto.getCode());
        simpMessagingTemplate.convertAndSend("/cs/"+csSocketDto.getUserId(),roomResByUser);

        Thread.sleep(10*1000);


        // 플레이어가 꽉 차면 게임 시작
        boolean isStart = isReadyToStart(roomDto);


        // 문제 뽑아오기
        List<CsProblem> randomProblem = csProblemRepository.findRandomProblem(numProblem);
        
        

        if (isStart){

            // 방에 사람이 꽉차서 시작한다고 함
            res.clear();
            res.put("msg", "ready");
            simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

            Thread.sleep(6*1000);

            // 게임 시작했다고 클라이언트에게 알리기

            System.out.println("게임 시작");
//              게임 시작
            CsRoomDto saved = csService.gameStart(roomDto, randomProblem);
//            게임 끝
            csService.gameEnd(saved,randomProblem);

            // 방 삭제
            deleteRoom(saved.getCode());
        }

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
//        if (!redisUtil.isExists(waitRoomKey))
        List<String> waitRooms = new ArrayList<>(redisUtil.getSetData(waitRoomKey));
        Collections.shuffle(waitRooms);

        String roomIdToEnter = null;

        for (String room:waitRooms){
            Optional<CsRoomDto> roomInfoOpt = csRoomRedisRepository.findById(room);

            // 방이 안찾아지면 다음으로
            if (roomInfoOpt.isEmpty()) continue;
            // 인원이 가득차면 다음으로

            CsRoomDto csRoom = roomInfoOpt.get();

            if (csRoom.getPlayers()==null)csRoom.setPlayers(new HashMap<>());
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

        log.debug("이 방으로 들어가요~"+roomIdToEnter);

        csSocketDto.setRoomCode(roomIdToEnter);

        CsRoomDto csRoomDto = enterRoom(csSocketDto);
        return csRoomDto;
    }

    // 친선전 방 만들기
    public CsRoomDto enterMyRoom(CsSocketDto csSocketDto) {
        // 들어갈 곳이 없으면 새로운 방 생성
        String newRoomCode = createRoom().getCode();

        csSocketDto.setRoomCode(newRoomCode);

        CsRoomDto csRoomDto = enterRoom(csSocketDto);
        return csRoomDto;
    }
    // 친선전 방 입장
    public synchronized CsRoomDto enterRoom(CsSocketDto csSocketDto){
        System.out.println(csSocketDto.toString());
        CsRoomDto csRoom = csRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        if (csRoom.getPlayers()==null)csRoom.setPlayers(new HashMap<>());
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
        System.out.println();
        CsRoomDto room = csRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());

        List<UserDto> playerList = room.getPlayers().values().stream()
                .map(id->{
                    System.out.println("아이디 "+id);
                    return userRepository.findById(id).orElseThrow(()->new UserNotFoundException()).toDto();
                })
                .collect(Collectors.toList());




//        res.put("players",getUserInRoom(csRoom.getCode()));
        simpMessagingTemplate.convertAndSend("/cs/room/"+roomId,playerList);
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
