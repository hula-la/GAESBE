package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomRedisDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgoRedisRepository extends CrudRepository<AlgoRoomRedisDto,String> {


}
