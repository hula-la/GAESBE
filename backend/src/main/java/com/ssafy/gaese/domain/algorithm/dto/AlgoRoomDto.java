package com.ssafy.gaese.domain.algorithm.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("code")
public class AlgoRoomDto {

    @Id
    private String roomCode;
    private String time;
    private String tier;
    private String num;

}
