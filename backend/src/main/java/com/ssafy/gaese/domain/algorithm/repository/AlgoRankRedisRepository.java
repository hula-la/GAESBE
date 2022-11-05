package com.ssafy.gaese.domain.algorithm.repository;


import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRankDto;
import org.springframework.data.repository.CrudRepository;

public interface AlgoRankRedisRepository extends CrudRepository<AlgoRankDto,String> {
}
