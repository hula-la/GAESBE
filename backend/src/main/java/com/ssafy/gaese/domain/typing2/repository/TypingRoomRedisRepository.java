package com.ssafy.gaese.domain.typing2.repository;

import com.ssafy.gaese.domain.typing2.dto.TypingRoomDto;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TypingRoomRedisRepository extends CrudRepository<TypingRoomDto, String> {

}