package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CsRecordRepository extends JpaRepository<CsRecord, Long> {
    Page<CsRecord> findAllByUser(User user, Pageable pageable);

}
