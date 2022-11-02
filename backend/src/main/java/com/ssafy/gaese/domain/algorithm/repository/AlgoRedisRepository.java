package com.ssafy.gaese.domain.algorithm.repository;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AlgoRedisRepository extends CrudRepository<AlgoRoomDto,String> {
    AlgoRoomDto findByCode(String code);


}
