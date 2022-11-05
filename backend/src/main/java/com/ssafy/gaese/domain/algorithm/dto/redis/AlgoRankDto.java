package com.ssafy.gaese.domain.algorithm.dto.redis;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@Builder
@RedisHash(value = "algoRank")
public class AlgoRankDto {

    @Id
    String roomCode;
    Double min;
    String nickName;

}
