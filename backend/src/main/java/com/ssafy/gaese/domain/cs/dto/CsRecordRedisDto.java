package com.ssafy.gaese.domain.cs.dto;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.HashMap;
import java.util.HashSet;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("CsRecord")
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
