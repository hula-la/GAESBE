package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.dto.AbilityDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.exception.AbilityNotFoundException;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AbilityService {
    private final AbilityRepository abilityRepository;

    public AbilityDto getAbility(Long userId){
        Ability ability = abilityRepository.findByUser_Id(userId).orElseThrow(() -> new AbilityNotFoundException());
        return ability.toDto();
    }

}
