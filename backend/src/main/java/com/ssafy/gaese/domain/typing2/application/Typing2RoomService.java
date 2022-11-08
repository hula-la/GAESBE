package com.ssafy.gaese.domain.typing2.application;

import com.ssafy.gaese.domain.cs.exception.ExceedMaxPlayerException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSocketDto;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.typing2.repository.TypingParagraphRepository;
import com.ssafy.gaese.domain.typing2.repository.TypingRoomRedisRepository;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.redis.SocketInfo;
import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Log4j2
public class Typing2RoomService {

    private final RedisUtil redisUtil;
    private final TypingRoomRedisRepository typingRoomRedisRepository;

    private final UserRepository userRepository;
    private final TypingParagraphRepository typingParagraphRepository;

    private final TypingService typingService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final SocketInfo socketInfo;

    private final int maxPlayer=2;
    private final String PythonWaitRoomKey="PythonTypingWaitRoom";
    private final String JavaWaitRoomKey="JavaTypingWaitRoom";

    public void enterOrLeave(TypingSocketDto typingSocketDto) throws InterruptedException {
        TypingRoomDto roomDto=null;
        Map<String,Object> res = new HashMap<>();
        Map<String,Object> roomResByUser = new HashMap<>();

        // 방 입장
        if(typingSocketDto.getType() == TypingSocketDto.Type.ENTER){

            // 랜덤방 들어가기
            if (typingSocketDto.getRoomType()!= TypingSocketDto.RoomType.FRIEND) roomDto = enterRandomRoom(typingSocketDto);
            // 친선전 들어가기
            else {
                // 방만들기
                if (typingSocketDto.getRoomCode()==null){
                    roomDto = enterMyRoom(typingSocketDto);
                }
                // 만들어져있는 방 들어가기기
               else{
                    roomDto = enterRoom(typingSocketDto);
                }
            }

            socketInfo.setSocketInfo(typingSocketDto.getSessionId(),
                    typingSocketDto.getUserId().toString(),
                    typingSocketDto.getRoomCode(),
                    "Typing2",
                    null);

            log.debug(typingSocketDto.getUserId()+"님이"+roomDto.getCode()+"방에 입장하였습니다.");
            res.put("enter",typingSocketDto.getUserId());
        }
        // 방 나가기
        else if(typingSocketDto.getType() == TypingSocketDto.Type.LEAVE){
            roomDto = leaveRoom(typingSocketDto);
            log.debug(typingSocketDto.getUserId()+"님이"+roomDto.getCode()+"방에서 나갔습니다.");
            res.put("exit",typingSocketDto.getUserId());

        }

        // enter exit 정보를 방 전원에게 보내줌
//        simpMessagingTemplate.convertAndSend("/cs/room/"+roomDto.getCode(),res);

        // 방 코드를 개인에게 전달
        roomResByUser.put("room",roomDto.getCode());
        simpMessagingTemplate.convertAndSend("/typing2/"+typingSocketDto.getUserId(),roomResByUser);

        Thread.sleep(1*1000);


        // 플레이어가 꽉 차면 게임 시작
        boolean isLast = isReadyToStart(roomDto);

        res.clear();
        res.put("isLast", isLast);
        simpMessagingTemplate.convertAndSend("/typing2/"+typingSocketDto.getUserId(),res);
        

    }

    public void gameProcess(TypingSocketDto typingSocketDto) throws InterruptedException {
        TypingRoomDto roomDto = typingRoomRedisRepository.findById(typingSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());


        Map<String,Object> res = new HashMap<>();
        // 방에 사람이 꽉차서 시작한다고 함
        res.clear();
        res.put("msg", "ready");
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);

        Thread.sleep(6*1000);

        // 게임 시작했다고 클라이언트에게 알리기

        System.out.println("게임 시작");

//              게임 시작
        typingService.gameStart(roomDto);
////            게임 끝
////        csService.gameEnd(saved,randomProblem);
//
//        res.put("msg", "end");
//        // 방 삭제
//        deleteRoom(roomDto.getCode());
    }

    // 방 생성
    // 해시로 저장
    public TypingRoomDto createRoom(String waitRoomKey){

        TypingRoomDto typingRoomDto = new TypingRoomDto();
        if(waitRoomKey==JavaWaitRoomKey) typingRoomDto.setLangType(TypingRecord.LangType.JAVA);
        else typingRoomDto.setLangType(TypingRecord.LangType.PYTHON);


        TypingRoomDto savedRoom = typingRoomRedisRepository.save(typingRoomDto);


        // 방만든 후에 대기 방에 넣음
        redisUtil.addSetData(waitRoomKey,savedRoom.getCode());

        return savedRoom;
    }

    //  랜덤 방 입장
    public synchronized TypingRoomDto enterRandomRoom(TypingSocketDto typingSocketDto){
//        if (!redisUtil.isExists(waitRoomKey))
        String waitRoomKey=null;
        if (typingSocketDto.getLangType()== TypingRecord.LangType.JAVA){
            waitRoomKey=JavaWaitRoomKey;
        }else{
            waitRoomKey=PythonWaitRoomKey;

        }
        List<String> waitRooms = new ArrayList<>(redisUtil.getSetData(waitRoomKey));
        Collections.shuffle(waitRooms);

        String roomIdToEnter = null;

        for (String room:waitRooms){
            Optional<TypingRoomDto> roomInfoOpt = typingRoomRedisRepository.findById(room);

            // 방이 안찾아지면 다음으로
            if (roomInfoOpt.isEmpty()) continue;
            // 인원이 가득차면 다음으로

            TypingRoomDto typingRoom = roomInfoOpt.get();

            if (typingRoom.getPlayers()==null)typingRoom.setPlayers(new HashMap<>());
            HashMap<String, Long> players = typingRoom.getPlayers();

            if (players.size()>=maxPlayer) continue;

            // 방이 가득 안찼으면 player에 추가하고 변경된 정보 저장
            roomIdToEnter = typingRoom.getCode();
            break;
        }

        // 들어갈 곳이 없으면 새로운 방 생성
        if (roomIdToEnter==null){
            roomIdToEnter = createRoom(waitRoomKey).getCode();
        }

        log.debug("이 방으로 들어가요~"+roomIdToEnter);

        typingSocketDto.setRoomCode(roomIdToEnter);

        TypingRoomDto typingRoomDto = enterRoom(typingSocketDto);
        return typingRoomDto;
    }

    // 친선전 방 만들기
    public TypingRoomDto enterMyRoom(TypingSocketDto typingSocketDto) {
        String waitRoomKey=null;
        if (typingSocketDto.getLangType()== TypingRecord.LangType.JAVA){
            waitRoomKey=JavaWaitRoomKey;
        }else{
            waitRoomKey=PythonWaitRoomKey;

        }
        // 들어갈 곳이 없으면 새로운 방 생성
        String newRoomCode = createRoom(waitRoomKey).getCode();

        typingSocketDto.setRoomCode(newRoomCode);

        TypingRoomDto csRoomDto = enterRoom(typingSocketDto);
        return csRoomDto;
    }
    // 친선전 방 입장
    public synchronized TypingRoomDto enterRoom(TypingSocketDto typingSocketDto){
        System.out.println(typingSocketDto.toString());
        TypingRoomDto typingRoomDto = typingRoomRedisRepository.findById(typingSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        if (typingRoomDto.getPlayers()==null)typingRoomDto.setPlayers(new HashMap<>());
        HashMap<String, Long> players = typingRoomDto.getPlayers();

        // 방이 가득찼다면 예외 날림
        if (players.size()>=maxPlayer) throw new ExceedMaxPlayerException();

        // 방이 가득 안찼으면 player에 추가하고 변경된 정보 저장
        players.put(typingSocketDto.getSessionId(),typingSocketDto.getUserId());

        TypingRoomDto saved = typingRoomRedisRepository.save(typingRoomDto);

        return saved;
    }

    // 방 나가기
    public TypingRoomDto leaveRoom(TypingSocketDto csSocketDto){
        TypingRoomDto csRoom = typingRoomRedisRepository.findById(csSocketDto.getRoomCode()).orElseThrow(()->new RoomNotFoundException());

        HashMap<String, Long> players = csRoom.getPlayers();
        players.remove(csSocketDto.getSessionId());

        // 바뀐 방 정보로 저장
        TypingRoomDto saved = typingRoomRedisRepository.save(csRoom);

        getUserInRoom(saved.getCode());
        return saved;
    }




    // 방에 있는 유저리스트 정보 조회
    public List<UserDto> getUserInRoom(String roomId){
        System.out.println();
        TypingRoomDto room = typingRoomRedisRepository.findById(roomId).orElseThrow(()->new RoomNotFoundException());

        List<UserDto> playerList = room.getPlayers().values().stream()
                .map(id->{
                    System.out.println("아이디 "+id);
                    return userRepository.findById(id).orElseThrow(()->new UserNotFoundException()).toDto();
                })
                .collect(Collectors.toList());




        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomId,playerList);
        return playerList;
    }

    public boolean isReadyToStart(TypingRoomDto typingRoomDto){
        String waitRoomKey=null;
        if (typingRoomDto.getLangType()== TypingRecord.LangType.JAVA){
            waitRoomKey=JavaWaitRoomKey;
        }else{
            waitRoomKey=PythonWaitRoomKey;

        }


        HashMap<String, Long> players = typingRoomDto.getPlayers();

        // 인원 안차면 시작 안함
        if (players.size()!=maxPlayer) return false;
        // 게임 시작하면 list에서 삭제
        redisUtil.removeSetData(waitRoomKey,typingRoomDto.getCode());


        return true;
    }

}
