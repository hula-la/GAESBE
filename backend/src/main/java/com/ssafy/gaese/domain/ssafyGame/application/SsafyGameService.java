package com.ssafy.gaese.domain.ssafyGame.application;

import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.ssafyGame.dto.*;
import com.ssafy.gaese.domain.ssafyGame.entity.SsafyRecord;
import com.ssafy.gaese.domain.ssafyGame.repository.SsafyRecordRepository;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SsafyGameService {

    private final UserRepository userRepository;

    private final AbilityRepository abilityRepository;

    private final ItemService itemService;

    private final FriendSocketService friendSocketService;

    private final UserCharacterRepository userCharacterRepository;

    private final CharacterRepository characterRepository;

    private final SsafyRecordRepository  ssafyRecordRepository;

    public FlipResultDto flipStart(FlipParamDto param, Long userId)
    {
        User user = userRepository.findById(userId).get();

        //가진 포인트 보다 많은걸 배팅한 경우
//        if(user.getPoint()< param.getPoint())
//        {
//            return null;
//        }

        FlipResultDto resultDto = new FlipResultDto();



        int  multiple =2;
        int rand =(int)((Math.random()*10000)%2)+6;



        //맞춘 경우
        if(rand== param.getPatten())
        {
//            user.setPoint(user.getPoint()+(multiple* param.getPoint()));
            user.setWinningStreak(user.getWinningStreak()+1);
            if(user.getWinningStreak()>user.getMaxWinStreak())
                user.setMaxWinStreak(user.getWinningStreak());

            Ability ability = abilityRepository.findByUser_Id(userId).get();

            ability.addExp("luck", user.getWinningStreak()/3);

            abilityRepository.save(ability);

            charChecker(user);


            resultDto.setCorrect(true);
        }
        else
        {
//            user.setPoint(user.getPoint()-(param.getPoint()));
            user.setWinningStreak(0);
            resultDto.setCorrect(false);
        }

//        resultDto.setPoint(user.getPoint());
        resultDto.setPatten(rand);
        resultDto.setWinningStreak(user.getWinningStreak());

        SsafyRecord ssafyRecord = new SsafyRecord();

        ssafyRecord.setCorrect(rand== param.getPatten());
        ssafyRecord.setDate(TimeUtil.getNowDateTime());
        ssafyRecord.setUser(user);
        ssafyRecord.setWinningStreak(user.getWinningStreak());

        ssafyRecordRepository.save(ssafyRecord);

        userRepository.save(user);

        return  resultDto;
    }

    void charChecker(User user)
    {
        List<CharacterDto> charDtoList = itemService.getCharacters(user.getId());
        ArrayList<Characters> characterArr = (ArrayList<Characters>) characterRepository.findAll();
        Map<Long,Characters> characters = new HashMap<>();
        for (Characters c:characterArr) {
            characters.put(c.getId(),c);
        }

        int charId=24;
        if(user.getMaxWinStreak()>6 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user, charId,characters);
        }
        charId=23;
        if(user.getMaxWinStreak()>3 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user, charId,characters);
        }
        charId=22;
        if(user.getMaxWinStreak()>1 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user, charId,characters);
        }
    }

    void userCharacterSet(User user, int charId, Map<Long,Characters> characters)
    {
        UserCharacter userCharacter = new UserCharacter();
        userCharacter.setUser(user);
        userCharacter.setCharacters(characters.get(charId));
        userCharacterRepository.save(userCharacter);
        friendSocketService.sendCharacters(user.getId(),(long)charId);
    }
    public FiveResultDto getFive(Long userId)
    {

        FiveResultDto result = new FiveResultDto();
        User user = userRepository.findById(userId).get();
        List<User> userList = userRepository.getNickMaxWinSteakDtoDesc();

        List<NickMaxWinSteakDto> list = new ArrayList<>();


        for (User u:userList )
        {
            NickMaxWinSteakDto nickMaxWinSteakDto = new NickMaxWinSteakDto();
            nickMaxWinSteakDto.setMax_win_streak(u.getMaxWinStreak());
            nickMaxWinSteakDto.setNickName(u.getNickname());

            list.add(nickMaxWinSteakDto);
        }


        result.setMyWinMaxWinStreak(user.getMaxWinStreak());
        result.setMyWinningStreak(user.getWinningStreak());
        result.setList(list);


        return result;
    }


    public Page<SsafyRecordDto> findTypingRecord(Long userId, Pageable pageable){
        Page<SsafyRecord> ssafyRecord = ssafyRecordRepository.findAllByUser(userRepository.findById(userId).orElseThrow(()->new UserNotFoundException()), pageable);
        Page<SsafyRecordDto> typingRecordDtoPage = ssafyRecord.map((typingRecord) -> typingRecord.toDto());
        return typingRecordDtoPage;
    }

    public int getWinCount(Long userId)
    {
        User user =userRepository.findById(userId).get();

        return user.getMaxWinStreak();
    }

}
