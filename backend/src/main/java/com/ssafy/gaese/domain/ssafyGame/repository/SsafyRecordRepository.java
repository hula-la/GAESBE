package com.ssafy.gaese.domain.ssafyGame.repository;

import com.ssafy.gaese.domain.ssafyGame.entity.SsafyRecord;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SsafyRecordRepository extends JpaRepository<SsafyRecord, Long> {

    Page<SsafyRecord> findAllByUser(User user, Pageable pageable);

    List<SsafyRecord> findAllByUser(User user);
}
