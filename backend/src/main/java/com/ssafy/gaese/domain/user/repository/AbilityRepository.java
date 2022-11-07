package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AbilityRepository extends JpaRepository<Ability,Long> {
    Optional<Ability> findByUser_Id(Long userId);

}
