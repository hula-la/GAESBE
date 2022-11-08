package com.ssafy.gaese.domain.typing2.repository;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypingRecordRepository extends JpaRepository<TypingRecord, Long> {
    Page<TypingRecord> findAllByUser(User user, Pageable pageable);

}
