package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CsRecordProblemRepository extends JpaRepository<CsRecordProblem, Long> {
//    Optional<CsWrongProblem> findByUser();
}
