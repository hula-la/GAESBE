package com.ssafy.gaese.domain.algorithm.dto;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

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

    public AlgoRoomRedisDto toRedisDto(String roomCode){
        return AlgoRoomRedisDto.builder()
                .algoRoomDto(this)
                .roomCode(roomCode)
                .build();
    }

}
