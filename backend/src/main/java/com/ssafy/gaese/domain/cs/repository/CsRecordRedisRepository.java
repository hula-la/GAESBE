package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.dto.CsRecordRedisDto;
import com.ssafy.gaese.domain.cs.dto.CsRoomDto;
import org.springframework.data.repository.CrudRepository;

public interface CsRecordRedisRepository extends CrudRepository<CsRecordRedisDto, String> {
}