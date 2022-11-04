package com.ssafy.gaese.domain.algorithm.dto;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Builder
@RedisHash(value = "algoRoom", timeToLive = 60*60*24)
public class AlgoRoomRedisDto {

    @Id
    private String roomCode;
    private AlgoRoomDto algoRoomDto;

    public AlgoRoomDto toDto(){
        return AlgoRoomDto.builder()
                .roomCode(this.getRoomCode())
                .no(this.getAlgoRoomDto().getNo())
                .num(this.getAlgoRoomDto().getNum())
                .tier(this.getAlgoRoomDto().getTier())
                .time(this.getAlgoRoomDto().getTime())
                .build();
    }
}
