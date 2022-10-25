package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgoRepository extends JpaRepository<AlgoRecord, Long> {

}
