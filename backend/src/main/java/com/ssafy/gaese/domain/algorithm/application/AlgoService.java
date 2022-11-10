package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.*;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRankDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomPassDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomRedisDto;
import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.algorithm.repository.*;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.redis.SocketInfo;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlgoService {

    private final AlgoRepository algoRepository;
    private final UserRepository userRepository;
    private final AlgoRedisRepository algoRedisRepository;
    private final AlgoRedisRepositoryCustom algoRedisRepositoryCustom;
    private final AlgoRankRedisRepository algoRankRedisRepository;
    private final AlgoRoomPassRepository algoRoomPassRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final SocketInfo socketInfo;
    private final SimpMessagingTemplate simpMessagingTemplate;


    public AlgoRecordDto createAlgoRecord(AlgoRecordReq algoRecordReq, Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
        Date date = new Date();
        AlgoRecordDto algoRecordDto;
        // roomCode, min, nickName, userId
        Optional<AlgoRankDto> opt = algoRankRedisRepository.findById(userId);
        if(opt.isPresent()){
            AlgoRankDto algoRankDto = opt.get();
            algoRecordDto = AlgoRecordDto.builder()
                    .isSolve(true)
                    .roomCode(algoRecordReq.getRoomCode())
                    .userId(userId)
                    .date(date)
                    .code(algoRecordReq.getCode())
                    .isRetry(false)
                    .problemId(algoRecordReq.getProblemId())
                    .ranking(algoRecordReq.getRanking())
                    .solveTime(algoRankDto.getMin())
                    .build();
            algoRankRedisRepository.delete(algoRankDto);
        }else{
            algoRecordDto = AlgoRecordDto.builder()
                    .isSolve(false)
                    .roomCode(algoRecordReq.getRoomCode())
                    .userId(userId)
                    .date(date)
                    .code(algoRecordReq.getCode())
                    .isRetry(false)
                    .problemId(algoRecordReq.getProblemId())
                    .ranking(algoRecordReq.getRanking())
                    .solveTime("-")
                    .build();
        }


        algoRepository.save(algoRecordDto.toEntity(user));

        return algoRecordDto;
    }

    public Page<AlgoRecordDto> recordList(Pageable pageable, Long userId){
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
        Page<AlgoRecord> algoRecords = algoRepository.findByUser(user, pageable);
        return algoRecords.map(algoRecord -> algoRecord.toDto());
    }

    public HashMap<String,List<AlgoRoomDto>> getRooms(){

        HashMap<String,List<AlgoRoomDto>> res = new HashMap<>();
        List<AlgoRoomDto> waitRoomList = new ArrayList<>();
        List<AlgoRoomDto> startRoomList = new ArrayList<>();

        Iterable<AlgoRoomRedisDto> algoRoomRedisDtos = algoRedisRepositoryCustom.getRooms();

        for(AlgoRoomRedisDto algoRoomRedisDto : algoRoomRedisDtos) {
             if(algoRoomRedisDto.getAlgoRoomDto().isStart()){
                startRoomList.add(algoRoomRedisDto.toDto());
            }else{
                waitRoomList.add(algoRoomRedisDto.toDto());
            }
        }

        res.put("start",startRoomList);
        res.put("wait",waitRoomList);

        return res;
    }

    public AlgoRoomDto createRoom(AlgoRoomDto algoRoomDto){
        String code = algoRedisRepositoryCustom.createCode();
      return algoRedisRepositoryCustom.createRoom(algoRoomDto.toRedisDto(code));
    }

    public boolean enterRoom(AlgoSocketDto algoSocketDto) {

        String enterUser = algoSocketDto.getUserId();

        userRepository.findById(Long.parseLong(enterUser)).orElseThrow(()->new UserNotFoundException());

        List<String> userInRoom = algoRedisRepositoryCustom.getUserInRoom(algoSocketDto.getRoomCode());

        if (enterUser != null && userInRoom.contains(enterUser)) {
            return false;
        } else {
            algoRedisRepositoryCustom.enterRoom(algoSocketDto);
            //session 정보 저장
            socketInfo.setSocketInfo(algoSocketDto.getSessionId(),
                    algoSocketDto.getUserId(),
                    algoSocketDto.getRoomCode(),
                    "Algo",
                    null);
            // 한개의 게임에만 접속할 수 있도록
            socketInfo.setOnlinePlayer(Long.parseLong(algoSocketDto.getUserId()));
            return true;
        }
    }

    public void leaveRoom(AlgoSocketDto algoSocketDto){
        System.out.println(algoSocketDto.getSessionId() + "나간다");
        HashOperations<String ,String, String > hashOperations = redisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();

        // 시작했는지 (startTime 있는지) 확인
        String startTime = hashOperations.get(algoSocketDto.getRoomCode(), "startTime");
        if(startTime != null ){
            System.out.println("시작함");
            //시작 후
            AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(algoSocketDto.getRoomCode()).orElseThrow(()->new NoSuchElementException());
            AlgoRankDto algoRankDto = AlgoRankDto.builder()
                    .min("--").nickName(userRepository.getNickNameById(Long.parseLong(algoSocketDto.getUserId()))).userId(Long.parseLong(algoSocketDto.getUserId())).build();
            zSetOperations.add(algoRankDto.getRoomCode()+"-rank", algoRankDto.getNickName(), algoRoomRedisDto.getAlgoRoomDto().getTime());
            algoRankRedisRepository.save(algoRankDto);
        }
        System.out.println("떠날꺼임");
        AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(algoSocketDto.getRoomCode()).orElseThrow(()->new NoSuchElementException());

        algoRedisRepositoryCustom.leaveRoom(algoSocketDto);
        if(algoRoomRedisDto.getAlgoRoomDto().getMaster().equals(algoSocketDto.getUserId())){
            
            if(changeMaster(algoSocketDto.getRoomCode())){
                System.out.println("마스터 변경");

                HashMap<String, Object> res = new HashMap<>();
                res.put("msg",algoSocketDto.getUserId()+" 님이 나가셨습니다.");

                List<AlgoUserDto> users = getUsers(getUserIds(algoSocketDto.getRoomCode()));
                res.put("users",users);
                res.put("master", getMaster(algoSocketDto.getRoomCode()));
                simpMessagingTemplate.convertAndSend("/algo/room/"+algoSocketDto.getRoomCode(),res);

            }else{
                System.out.println("방 제거");
                deleteRoom(algoSocketDto.getRoomCode());
                return;
            }
        }
    }


    public String getMaster(String roomCode){
        Optional<AlgoRoomRedisDto> opt = algoRedisRepository.findById(roomCode);
        if(opt.isPresent()){
            AlgoRoomRedisDto algoRoomRedisDto = opt.get();
            return algoRoomRedisDto.getAlgoRoomDto().getMaster();
        }else{
            return null;
        }
    }
    public boolean changeMaster(String roomCode){
        List<String> userIds = algoRedisRepositoryCustom.getUserInRoom(roomCode);
        if(userIds.size()==0) {
            return false;
        }
        AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(roomCode).orElseThrow(()->new NoSuchElementException());
        algoRoomRedisDto.getAlgoRoomDto().changeMaster(userIds.get(0));
        System.out.println(algoRoomRedisDto.toDto());
        algoRedisRepository.save(algoRoomRedisDto);
        return true;
    }

    public void deleteRoom(String code){
        HashOperations<String,String,String>hashOperations = redisTemplate.opsForHash();
        //시작했다면
        String startTime = hashOperations.get(code, "startTime");
        if(startTime != null ){
            // pass 정보 삭제
            AlgoRoomPassDto algoRoomPassDto  = algoRoomPassRepository.findById(code).orElseThrow(()-> new NoSuchElementException());
            algoRoomPassRepository.delete(algoRoomPassDto);
        }

        AlgoRoomRedisDto algoRoomRedisDto = algoRedisRepository.findById(code).orElseThrow(()->new NoSuchElementException());
        // 방 삭제
        algoRedisRepository.delete(algoRoomRedisDto);
        // 방 유저 정보 삭제
        algoRedisRepositoryCustom.deleteRoomUser(algoRoomRedisDto);

    }

    public int confirmRoomEnter(String roomCode, Long userId){
        if(socketInfo.isPlayGame(userId)) return 0;
        if(algoRedisRepositoryCustom.getRoomNum(roomCode) >= 4) return -1;
        return 1;
    }
    public List<String> getUserIds(String roomCode){
        return algoRedisRepositoryCustom.getUserInRoom(roomCode);
    }
    public List<AlgoUserDto> getUsers(List<String> userIds){
        return userRepository.findUsersByIds(userIds.stream().map(id->Long.parseLong(id)).collect(Collectors.toList())).stream().map(
                user -> user.toAlgoDto()).collect(Collectors.toList());
    }


    public String checkBjId(Long userId){
        Optional<String> opt = userRepository.getBjIdById(userId);
        if(opt.isPresent()){
            return opt.get();
        }
        return null;
    }

    public String createCode(Long userId){
        String code = algoRedisRepositoryCustom.createCode();
        HashOperations<String, String,String> hashOperations = redisTemplate.opsForHash();
        hashOperations.put("bjCodes",userId+"",code);

        return code;
    }

    public Boolean confirmCode(Long userId){
        HashOperations<String, String,String> hashOperations = redisTemplate.opsForHash();
        String code = hashOperations.get("bjCodes",userId+"");
        Boolean res = false;
        try{
            WebDriverManager.chromedriver().setup();
            ChromeOptions chromeOptions = new ChromeOptions();
            chromeOptions.addArguments("--no-sandbox");
            chromeOptions.addArguments("--headless");
            chromeOptions.addArguments("disable-gpu");
            chromeOptions.addArguments("--disable-dev-shm-usage");
            ChromeDriver driver = new ChromeDriver(chromeOptions);
            // 크롤링
            driver.get("https://www.acmicpc.net/user/"+userRepository.getBjIdById(userId).get());
            WebElement element = driver.findElement(By.className("no-mathjax"));
            String msg = element.getText();
            if(msg.contains(code)){
                res = true;
                hashOperations.delete("bjCodes", userId+"");
            }
        }catch (Exception e){
            System.out.println("크롤링 중 에러 발생");
            System.out.println(e.getMessage());
        }
        return res;
    }


}
