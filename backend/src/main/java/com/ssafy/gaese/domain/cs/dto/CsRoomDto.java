package com.ssafy.gaese.domain.cs.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.*;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("CsRoom")
public class CsRoomDto {


    @Id
    private String code;
    private String name;
    private HashMap<Long, String> players;
    private HashSet<Long> problems;
    private Long currentIdx;


    public static CsRoomDto create() {
        CsRoomDto csRoomDto = new CsRoomDto();
        csRoomDto.players = new HashMap<>();
        csRoomDto.problems = new HashSet<>();
        csRoomDto.currentIdx = 0L;
        return csRoomDto;
    }
}
