package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSocketDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoUserDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomRedisDto;
import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoUserRedisDto;
import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepositoryCustom;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRepository;

import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlgoService {

    @Value("${chrome-driver-path}")
    private String ChromePath;

    private final AlgoRepository algoRepository;
    private final UserRepository userRepository;
    private final AlgoRedisRepositoryCustom algoRedisRepositoryCustom;
    private final RedisTemplate<String, String> redisTemplate;

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

    public void enterRoom(AlgoSocketDto algoSocketDto){
        algoRedisRepositoryCustom.enterRoom(algoSocketDto);
    }

    public void leaveRoom(AlgoSocketDto algoSocketDto){
        algoRedisRepositoryCustom.leaveRoom(algoSocketDto);
    }

    public Long deleteRoom(String code){
        return algoRedisRepositoryCustom.deleteRoom(code);
    }

    public Boolean confirmRoomEnter(String roomCode){
        System.out.println(algoRedisRepositoryCustom.getRoomNum(roomCode));
        if(algoRedisRepositoryCustom.getRoomNum(roomCode) == 4) return false;
        return true;
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
            System.setProperty("webdriver.chrome.driver",ChromePath);
            ChromeOptions options = new ChromeOptions();
            options.addArguments("headless"); // 창 없이 크롤링
            WebDriver driver = new ChromeDriver(options);
            // 크롤링
            driver.get("https://www.acmicpc.net/user/"+userRepository.getBjIdById(userId).get());
            WebElement element = driver.findElement(By.className("no-mathjax"));
            String msg = element.getText();
            if(msg.contains(code)){
                res = true;
                hashOperations.delete("bjCodes", userId+"");
            }
        }catch (Exception e){
            /** 크롤링 에러처리 */
        }
        return res;
    }


}
