package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.dto.AbilityDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.AbilityNotFoundException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
            ability=abilityRepository.save(new Ability(user));
        } else ability=abilityOpt.get();

        return ability.toDto();
    }

}
