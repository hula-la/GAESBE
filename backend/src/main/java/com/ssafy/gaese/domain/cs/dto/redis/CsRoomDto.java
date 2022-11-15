package com.ssafy.gaese.domain.cs.dto.redis;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "CsRoom", timeToLive = 60*60*2)
public class CsRoomDto {
    public enum RoomType {
        RANDOM, FRIEND;
    }

    @Id
    private String code;
    private String name;
    // sessionId: userId
    private HashMap<String, Long> players;
    private HashSet<Long> problems;
    private Long currentIdx;
    private int round;
    private RoomType roomType;
    private Long master;

    // 문제를 풀었는지
    private HashMap<Long, Integer> isSolvedByPlayer;

    private HashMap<Integer, Integer> numCorrectByRound;
    private HashMap<Long, Long> score;


    public static CsRoomDto create() {
        CsRoomDto csRoomDto = new CsRoomDto();
        csRoomDto.currentIdx = -1L;
        csRoomDto.round = 0;
        return csRoomDto;
    }
}
