package com.ssafy.gaese.domain.algorithm.dto.redis;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RedisHash(value = "algoPass")
public class AlgoRoomPassDto {

    @Id
    private String roomCode;
    private int nowNo;
    private boolean isPass;

}
