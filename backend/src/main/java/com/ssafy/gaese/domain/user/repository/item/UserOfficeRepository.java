package com.ssafy.gaese.domain.user.repository.item;

import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.entity.item.UserOffice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOfficeRepository extends JpaRepository<UserOffice,Long> {

}
