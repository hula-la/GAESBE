package com.ssafy.gaese.domain.algorithm.dto;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlgoRoomDto {

    private String roomCode;
    private String time;
    private String tier;
    private String num;
    private String no;
    private String master;

    public AlgoRoomRedisDto toRedisDto(String roomCode){
        return AlgoRoomRedisDto.builder()
                .algoRoomDto(this)
                .roomCode(roomCode)
                .users(new ArrayList<>())
                .build();
    }

}
