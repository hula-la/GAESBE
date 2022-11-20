package com.ssafy.gaese.domain.typing2.application;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSocketDto;
import com.ssafy.gaese.domain.typing2.dto.TypingSubmitDto;
import com.ssafy.gaese.domain.typing2.entity.TypingParagraph;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.typing2.repository.TypingParagraphRepository;
import com.ssafy.gaese.domain.typing2.repository.TypingRecordRepository;
import com.ssafy.gaese.domain.typing2.repository.TypingRoomRedisRepository;
import com.ssafy.gaese.domain.user.application.ItemService;
import com.ssafy.gaese.domain.user.dto.item.CharacterDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.item.Characters;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.repository.item.CharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.UserCharacterRepository;
import com.ssafy.gaese.global.util.TimeUtil;
import jdk.jshell.execution.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TypingService {

    private final TypingRecordRepository typingRecordRepository;
    private final TypingParagraphRepository typingParagraphRepository;
    private final UserRepository userRepository;

    private final TypingRoomRedisRepository typingRoomRedisRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final AbilityRepository abilityRepository;

    private final ItemService itemService;

    private final FriendSocketService friendSocketService;

    private final UserCharacterRepository userCharacterRepository;

    private final CharacterRepository characterRepository;


    public Page<TypingRecordDto> findTypingRecord(Long userId, Pageable pageable){
        Page<TypingRecord> TypingRecords = typingRecordRepository
                .findAllByUser(userRepository.findById(userId).orElseThrow(()->new UserNotFoundException()), pageable);
        Page<TypingRecordDto> typingRecordDtoPage = TypingRecords.map((typingRecord) -> typingRecord.toDto());
        return typingRecordDtoPage;
    }

    public int getWinCount(Long userId)
    {
        User user =userRepository.findById(userId).get();
        List<TypingRecord> TypingRecords = typingRecordRepository.findAllByUser(user);
        int count =0;
        for (TypingRecord tr:TypingRecords ) {
            if(tr.getRanks()==1)
                count++;

        }
        return count;
    }


    public void gameStart(TypingRoomDto roomDto) throws InterruptedException {
        Map<String,Object> res = new HashMap<>();

        System.out.println("게임 시작");
        System.out.println(roomDto);

        // 게임 시작했다고 클라이언트에게 알리기
        res.put("msg", "게임이 시작되었습니다.");
        res.put("start", true);
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);


        // 진행도 미리 보냄
        HashMap<Long, Float> progressByPlayer = new HashMap<>();
        HashMap<Long, Integer> point = new HashMap<>();
        roomDto.getPlayers().values().forEach(v->{
            progressByPlayer.put(v,0f);
            point.put(v,0);
        });
        roomDto.setProgressByPlayer(progressByPlayer);
        roomDto.setPoint(point);
        res.clear();
        res.put("roomDto",roomDto);
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);



        // 랜덤 문단
        List<TypingParagraph> randomProblem = typingParagraphRepository.findRandomProblem(1,roomDto.getLangType().name());
        TypingParagraph paragraph = randomProblem.get(0);
        Long paragraphId = paragraph.getId();

        System.out.println("선택된 문단"+paragraph.getContent());
        System.out.println("선택된 문단"+paragraph.getId());


        roomDto.setParagraphId(paragraphId);
        roomDto.setParagraphLength(paragraph.getContent().replace(" ","").length());
        //paragraph.getContent().length()
        //줄 구분할 공백 부분 카운팅 제거

        roomDto.setStart(true);
//        시작 시간 알림
        roomDto.setStartTime(System.currentTimeMillis());
        roomDto.setStartSpeedTime(TimeUtil.forTypingSpeedTime());
        roomDto = typingRoomRedisRepository.save(roomDto);

        // 문제 보내기
        res.clear();
        res.put("paragraph", paragraph.getContent());
        res.put("roomDto", roomDto);
        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);
    }

    public void gameEnd(TypingRoomDto roomDto,Long winUserId){

        Map<String,Object> res = new HashMap<>();

        User winUser = userRepository.findById(winUserId).get();

        // 끝났다는 메시지
        res.put("msg", "게임이 종료되었습니다.");
        res.put("winUserId", winUser.getId());
        res.put("winUserNickName", winUser.getNickname());
        res.put("winUserProfile", winUser.getProfileChar());
        roomDto.setEnd(true);

        typingRoomRedisRepository.save(roomDto);

        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);

        if(roomDto.getRoomType()== TypingSocketDto.RoomType.RANDOM)
        {
            rankUpdate(roomDto);
        }

        deleteRoom(roomDto.getCode());
    }

    public void rankUpdate(TypingRoomDto roomDto)
    {
        LocalDateTime now = LocalDateTime.now();
        String formatedNow = now.format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        int rank =1;
        int nowSpeedTime = TimeUtil.forTypingSpeedTime() -roomDto.getStartSpeedTime();
        if(nowSpeedTime<0)
            nowSpeedTime+=3600;

        while(roomDto.getPlayers().size()>0)
        {
            long maxId=0;
            float maxProgress=0;
            String maxKey="";
            //높은 순위 찾기
            Iterator<String> keys = roomDto.getPlayers().keySet().iterator();
            while( keys.hasNext() ){

                String Key = keys.next();
                Long id = roomDto.getPlayers().get(Key);
                float progress = roomDto.getProgressByPlayer().get(id);
                if(maxProgress <=progress)
                {
                    maxKey=Key;
                    maxProgress =progress;
                    maxId =id;
                }
            }

            //레코드 기록
            TypingRecord typingRecord = new TypingRecord();
            typingRecord.setRanks(rank);
            System.out.println("nowSpeedTime : " + nowSpeedTime);
            System.out.println("roomDto.getPoint().get(maxId) : " + roomDto.getPoint().get(maxId));
            typingRecord.setTypeSpeed((roomDto.getPoint().get(maxId)*60) /nowSpeedTime);
            typingRecord.setDate(formatedNow);
            typingRecord.setLangType(roomDto.getLangType());
            typingRecord.setUser(userRepository.findById(maxId).get());
            typingRecordRepository.save(typingRecord);
            charChecker(maxId);
            Ability ability = abilityRepository.findByUser_Id(maxId).get();
//            System.out.println("변화 전 어빌리티");
//            System.out.println(maxId);
//            System.out.println(ability.getTypingLv());
//            System.out.println(ability.getTypingExp());
            ability.addExp("typing",5-rank);
//            System.out.println("변화 후 어빌리티");
//            System.out.println(ability.getTypingLv());
//            System.out.println(ability.getTypingExp());
            abilityRepository.save(ability);

            roomDto.getPlayers().remove(maxKey);

            maxProgress = 0;
            rank++;
        }

    }

    // 방 삭제 (게임 끝나면 방 삭제)
    public boolean deleteRoom(String roomId){
        typingRoomRedisRepository.deleteById(roomId);

        return true;
    }

    public synchronized void submitAnswer(TypingSubmitDto typingSubmitDto){
        Map<String,Object> res = new HashMap<>();

        TypingRoomDto roomDto = typingRoomRedisRepository
                .findById(typingSubmitDto.getRoomCode())
                .orElseThrow(()->new RoomNotFoundException());


        Long userId = typingSubmitDto.getUserId();
        HashMap<Long, Float> progressByPlayer = roomDto.getProgressByPlayer();
        Integer point = roomDto.getPoint().get(userId)+1;
        roomDto.getPoint().put(userId,point);
        int paragraphLength = roomDto.getParagraphLength();
        float pointPerWord = (float) (100*point / paragraphLength);

//        float pointPerWord = (float) (1);

        progressByPlayer.put(userId,pointPerWord);

        roomDto.setProgressByPlayer(progressByPlayer);


        // 진행도
        res.clear();
        res.put("progressByPlayer", progressByPlayer);

        simpMessagingTemplate.convertAndSend("/typing2/room/"+roomDto.getCode(),res);

        // 바뀐 사항 저장
        TypingRoomDto saved = typingRoomRedisRepository.save(roomDto);

        // 한명이 다 치면 게임 끝
        if (progressByPlayer.get(userId)>=100) {
            gameEnd(saved, userId);
//
//        res.put("msg", "end");
        }
    }


    void charChecker(Long userid)
    {
        User user = userRepository.findById(userid).get();

        List<TypingRecord> typingRecords = typingRecordRepository.findAllByUser(user);
        ArrayList<Characters> characterArr = (ArrayList<Characters>) characterRepository.findAll();
        Map<Long,Characters> characters = new HashMap<>();
        for (Characters c:characterArr) {
            characters.put(c.getId(),c);
        }
        int oneCount=0;
        int threeCount=0;

        for (TypingRecord typingRecord:typingRecords)
        {
            if(typingRecord.getRanks()<2)
            {
                oneCount++;
                threeCount++;
            }
        }

        long charId=11;

        if(oneCount>6 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
        charId=10;
        if(oneCount>2 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
        charId=9;
        if(oneCount>0 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }

        charId=8;
        if(!userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }


    }

    void userCharacterSet(User user, long charId, Map<Long,Characters> characters)
    {
        UserCharacter userCharacter = new UserCharacter();
        userCharacter.setUser(user);
        userCharacter.setCharacters(characters.get(charId));
        userCharacterRepository.save(userCharacter);
        friendSocketService.sendCharacters(user.getId(),(long)charId);
    }
}
