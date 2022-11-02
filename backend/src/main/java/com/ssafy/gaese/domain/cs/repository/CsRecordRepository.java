package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CsRecordRepository extends JpaRepository<CsRecord, Long> {
    Optional<CsRecord> findByUser();
}
