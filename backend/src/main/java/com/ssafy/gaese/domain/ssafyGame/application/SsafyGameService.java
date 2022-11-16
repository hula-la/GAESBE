package com.ssafy.gaese.domain.ssafyGame.application;

import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipParamDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipResultDto;
import com.ssafy.gaese.domain.user.application.ItemService;
import com.ssafy.gaese.domain.user.dto.item.CharacterDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.item.Characters;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.repository.item.CharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.UserCharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SsafyGameService {

    private final UserRepository userRepository;

    private final AbilityRepository abilityRepository;

    private final ItemService itemService;

    private final FriendSocketService friendSocketService;

    private final UserCharacterRepository userCharacterRepository;

    private final CharacterRepository characterRepository;

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

        userRepository.save(user);

        return  resultDto;
    }

    void charChecker(User user)
    {
        List<CharacterDto> charDtoList = itemService.getCharacters(user.getId());
        ArrayList<Characters> characters = (ArrayList<Characters>) characterRepository.findAll();


        if(user.getMaxWinStreak()>6 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(23)).isPresent())
        {
            UserCharacter userCharacter = new UserCharacter();
            userCharacter.setUser(user);
            userCharacter.setCharacters(characters.get(23));
            userCharacterRepository.save(userCharacter);
            friendSocketService.sendCharacters(user.getId(),23L);
        }
        if(user.getMaxWinStreak()>3 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(22)).isPresent())
        {
            UserCharacter userCharacter = new UserCharacter();
            userCharacter.setUser(user);
            userCharacter.setCharacters(characters.get(22));
            userCharacterRepository.save(userCharacter);
            friendSocketService.sendCharacters(user.getId(),22L);
        }
        if(user.getMaxWinStreak()>1 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(21)).isPresent())
        {
            UserCharacter userCharacter = new UserCharacter();
            userCharacter.setUser(user);
            userCharacter.setCharacters(characters.get(21));
            userCharacterRepository.save(userCharacter);
            friendSocketService.sendCharacters(user.getId(),21L);
        }
    }

}
