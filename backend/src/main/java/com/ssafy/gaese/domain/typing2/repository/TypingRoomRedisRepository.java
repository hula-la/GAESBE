package com.ssafy.gaese.domain.typing2.repository;

import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import org.springframework.data.repository.CrudRepository;

public interface TypingRoomRedisRepository extends CrudRepository<TypingRoomDto, String> {
}