package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.dto.item.CharacterDto;
import com.ssafy.gaese.domain.user.dto.item.OfficeDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.item.Characters;
import com.ssafy.gaese.domain.user.entity.item.Office;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.entity.item.UserOffice;
import com.ssafy.gaese.domain.user.exception.LevelNotSatisfiedException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.repository.item.CharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.OfficeRepository;
import com.ssafy.gaese.domain.user.repository.item.UserCharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.UserOfficeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final CharacterRepository characterRepository;
    private final OfficeRepository officeRepository;
    private final UserRepository userRepository;
    private final UserOfficeRepository userOfficeRepository;
    private final UserCharacterRepository userCharacterRepository;

    public List<CharacterDto> getCharacters(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());

        Set<Long> characterIdList = user.getUserCharacterList().stream().map(uc -> uc.getCharacters().getId()).collect(Collectors.toSet());
        List<CharacterDto> characters = characterRepository.findAll().stream()
                .map(c -> c.toDto(characterIdList.contains(c.getId())))
                .collect(Collectors.toList());

        return characters;

    }

    public List<OfficeDto> getOffices(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());

        Set<Long> officeIdList = user.getUserOfficeList().stream().map(uc -> uc.getOffice().getId()).collect(Collectors.toSet());

        List<OfficeDto> offices = officeRepository.findAll().stream()
                .map(c -> c.toDto(officeIdList.contains(c.getId())))
                .collect(Collectors.toList());

        return offices;
    }

    @Transactional
    public List<OfficeDto> buyOffice(Long userId, Long officeId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
        Office office = officeRepository.findById(officeId).orElseThrow(() -> new RuntimeException("오피스가 없습니다"));

        // 레벨 확인
        int mnLv=Integer.MAX_VALUE;
        Ability ability = user.getAbility();
        mnLv = Math.min(mnLv, ability.getAlgorithmLv());
        mnLv = Math.min(mnLv, ability.getTypingLv());
        mnLv = Math.min(mnLv, ability.getCsLv());
        mnLv = Math.min(mnLv, ability.getLuckLv());

        if(mnLv<office.getMinLv())  throw new LevelNotSatisfiedException();

        //이미 유저 오피스 레벨이 더 높다면 오히려 더 낮아지므로 조건문 넣었음, 같은경우도 의미는 없음
        else if(user.getOfficeLv()<officeId)
        {
            user.setOfficeLv(officeId.intValue());
            userRepository.save(user);
        }
        UserOffice save = userOfficeRepository.save(UserOffice.builder()
                .office(office)
                .user(user)
                .build());


        return getOffices(userId);
    }

    @Transactional
    public List<CharacterDto> buyCharacter(Long userId, Long characterId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
        Characters character = characterRepository.findById(characterId).orElseThrow(() -> new RuntimeException("캐릭터가 없습니다"));

        // 조건 확인


        userCharacterRepository.save(UserCharacter.builder()
                .characters(character)
                .user(user)
                .build());


        return getCharacters(userId);
    }

}
