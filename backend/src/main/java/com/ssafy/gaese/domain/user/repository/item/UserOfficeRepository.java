package com.ssafy.gaese.domain.user.repository.item;

import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.item.Office;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.entity.item.UserOffice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserOfficeRepository extends JpaRepository<UserOffice,Long> {

    Optional<UserOffice> findByUserAndOffice(User user, Office office);
}
