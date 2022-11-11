package com.ssafy.gaese.domain.ssafyGame.application;

import com.ssafy.gaese.domain.ssafyGame.dto.FlipParamDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipResultDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SsafyGameService {

    private final UserRepository userRepository;

    public FlipResultDto flipStart(FlipParamDto param, Long userId)
    {
        User user = userRepository.findById(userId).get();

        //가진 포인트 보다 많은걸 배팅한 경우
        if(user.getPoint()< param.getPoint())
        {
            return null;
        }

        FlipResultDto resultDto = new FlipResultDto();



        int  multiple =2;
        int rand =(int)((Math.random()*10000)%2)+6;



        //맞춘 경우
        if(rand== param.getPatten())
        {
            user.setPoint(user.getPoint()+(multiple* param.getPoint()));
            user.setWinningStreak(user.getWinningStreak()+1);
            resultDto.setCorrect(true);
        }
        else
        {
            user.setPoint(user.getPoint()-(param.getPoint()));
            user.setWinningStreak(0);
            resultDto.setCorrect(false);
        }

        resultDto.setPoint(user.getPoint());
        resultDto.setPatten(rand);

        userRepository.save(user);

        return  resultDto;
    }

}
