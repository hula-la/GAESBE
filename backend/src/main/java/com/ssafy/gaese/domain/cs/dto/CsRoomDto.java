package com.ssafy.gaese.domain.cs.dto;


import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("CsRoom")
public class CsRoomDto {
    public enum RoomStatus {
        START, WAIT;
    }


    @Id
    private String code;
    private String name;
    // sessionId: userId
    private HashMap<String, Long> players;
    private HashSet<Long> problems;
    private Long currentIdx;
    private int round;
    private RoomStatus roomStatus;

    private HashMap<Integer, Integer> numCorrectByRound;
    private HashMap<Long, Long> score;


    public static CsRoomDto create() {
        CsRoomDto csRoomDto = new CsRoomDto();
        csRoomDto.players = new HashMap<>();
        csRoomDto.problems = new HashSet<>();
        csRoomDto.currentIdx = -1L;
        csRoomDto.round = 0;
        csRoomDto.roomStatus = RoomStatus.WAIT;
        csRoomDto.numCorrectByRound = new HashMap<>();
        return csRoomDto;
    }
}
