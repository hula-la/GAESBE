package com.ssafy.gaese.domain.cs.dto.redis;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "CsRecord", timeToLive = 60*60*2)
public class CsRecordRedisDto {

    @Id
    private String code;
    private Boolean[] isCorrectList;

    public static CsRecordRedisDto create(String roomCode,Long userId,int problemNum) {
        CsRecordRedisDto csRoomDto = new CsRecordRedisDto();
        csRoomDto.isCorrectList = new Boolean[problemNum];
        for (int i = 0; i < problemNum; i++) {
            csRoomDto.isCorrectList[i]=false;
        }
        csRoomDto.code = roomCode+userId;
        return csRoomDto;
    }
}
