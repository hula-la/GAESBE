package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.Ability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AbilityRepository extends JpaRepository<Ability,Long> {
    Optional<Ability> findByUser_Id(Long userId);


    @Query(value = "SELECT * FROM gaese.ability ORDER BY algorithm_lv desc, algorithm_exp desc",nativeQuery = true)
    List<Ability> findAbilityOderByAlgoLvExp();
}
