package com.ssafy.gaese.domain.typing2.repository;

import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.typing2.entity.TypingParagraph;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TypingParagraphRepository extends JpaRepository<TypingParagraph, Long> {
    @Query(value = "SELECT * FROM gaese.typing_paragraph WHERE langType=:langType order by RAND() limit :ProblemNum",nativeQuery = true)
    List<TypingParagraph> findRandomProblem(@Param("ProblemNum") int problemNum, TypingRecord.LangType langType);

}
