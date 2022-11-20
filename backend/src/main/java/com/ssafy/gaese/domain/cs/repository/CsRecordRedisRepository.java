package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.dto.redis.CsRecordRedisDto;
import org.springframework.data.repository.CrudRepository;

public interface CsRecordRedisRepository extends CrudRepository<CsRecordRedisDto, String> {
}