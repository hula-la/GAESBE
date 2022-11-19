package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.dto.AbilityDto;
import com.ssafy.gaese.domain.user.dto.LvExpDto;
import com.ssafy.gaese.domain.user.dto.RankDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.AbilityNotFoundException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AbilityService {
    private final AbilityRepository abilityRepository;
    private final UserRepository userRepository;



    public AbilityDto getAbility(Long userId){
        Optional<Ability> abilityOpt = abilityRepository.findByUser_Id(userId);

        Ability ability=null;

        if (!abilityOpt.isPresent()){
            User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException());
            ability=abilityRepository.save(Ability.builder()
                    .user(user)
                    .build());
        } else ability=abilityOpt.get();

        return ability.toDto();
    }

    public RankDto getRank(Long userId)
    {
        int RankLenSize =10;

        RankDto rankDto = new RankDto();

        //algo에 대해선 이미 정렬해서 받음
        List<Ability> abilityList = abilityRepository.findAbilityOderByAlgoLvExp();



        List<LvExpDto> algo = new ArrayList<>();
        List<LvExpDto> cs = new ArrayList<>();
        List<LvExpDto> typing = new ArrayList<>();
        List<LvExpDto> luck = new ArrayList<>();
        Long count=0L;
        for (Ability ab:abilityList)
        {
            count++;
            Long id=ab.getUser().getId();
            String nick =ab.getUser().getNickname();
            //알고 순위 기록
            if(id==userId)
                rankDto.setMyAlgoRank(count);

            algo.add(new LvExpDto(id, nick,  ab.getAlgorithmLv(),ab.getAlgorithmExp()));
            cs.add(new LvExpDto(id, nick,  ab.getCsLv(),ab.getCsExp()));
            typing.add(new LvExpDto(id, nick,  ab.getTypingLv(),ab.getTypingExp()));
            luck.add(new LvExpDto(id, nick,  ab.getLuckLv(),ab.getLuckExp()));

        }

        Collections.sort(cs);
        Collections.sort(typing);
        Collections.sort(luck);

        for (int i =0 ; i<cs.size();i++)
        {
            if(cs.get(i).getUserId()==userId)
            {
                rankDto.setMyCsRank((long) i+1);
            }
            if(typing.get(i).getUserId()==userId)
            {
                rankDto.setMyTypingRank((long) i+1);
            }
            if(luck.get(i).getUserId()==userId)
            {
                rankDto.setMyLuckRank((long) i+1);
            }
        }
        if(algo.size()<RankLenSize)
            RankLenSize=algo.size();
        rankDto.setAlgo(algo.subList(0,RankLenSize));
        rankDto.setCs(cs.subList(0,RankLenSize));
        rankDto.setTyping(typing.subList(0,RankLenSize));
        rankDto.setLuck(luck.subList(0,RankLenSize));

        return rankDto;
    }

}
