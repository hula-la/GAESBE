package com.ssafy.gaese.domain.user.repository.item;

import com.ssafy.gaese.domain.user.entity.item.Character;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character,Long> {

}
