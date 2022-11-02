package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsWrongProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CsWrongRepository extends JpaRepository<CsWrongProblem, Long> {
    Optional<CsWrongProblem> findByUser();
}
