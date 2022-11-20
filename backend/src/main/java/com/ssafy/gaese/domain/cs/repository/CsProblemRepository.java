package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CsProblemRepository extends JpaRepository<CsProblem, Long> {
    @Query(value = "SELECT * FROM gaese.cs_problem order by RAND() limit :ProblemNum",nativeQuery = true)
    List<CsProblem> findRandomProblem(@Param("ProblemNum") int problemNum);

}
