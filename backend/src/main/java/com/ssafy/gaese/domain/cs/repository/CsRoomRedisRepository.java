package com.ssafy.gaese.domain.cs.repository;

import com.ssafy.gaese.domain.cs.dto.redis.CsRoomDto;
import org.springframework.data.repository.CrudRepository;

public interface CsRoomRedisRepository extends CrudRepository<CsRoomDto, String> {
}