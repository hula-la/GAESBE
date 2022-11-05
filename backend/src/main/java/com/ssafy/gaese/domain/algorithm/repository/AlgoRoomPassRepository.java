package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomPassDto;
import org.springframework.data.repository.CrudRepository;

public interface AlgoRoomPassRepository extends CrudRepository<AlgoRoomPassDto, String> {

}
