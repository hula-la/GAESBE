package com.ssafy.gaese.domain.algorithm.dto;


import com.ssafy.gaese.domain.algorithm.dto.redis.AlgoRoomRedisDto;
import lombok.*;

import java.util.ArrayList;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlgoRoomDto {

    private String roomCode;
    private Long time;
    private String tier;
    private String num;
    private String no;
    private String master;
    private boolean isStart;

    public AlgoRoomRedisDto toRedisDto(String roomCode){
        return AlgoRoomRedisDto.builder()
                .algoRoomDto(this)
                .roomCode(roomCode)
                .build();
    }
    public void changeMaster(String master){
        this.master = master;
    }

}
