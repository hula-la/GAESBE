package com.ssafy.gaese.domain.typing2.dto;


import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
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
@Builder
@RedisHash(value = "TypingRoom", timeToLive = 3600)
public class TypingRoomDto {

    @Id
    private String code;
    private HashMap<String, Long> players;
    private Long paragraphId;

    private TypingRecord.LangType langType;

    private boolean isEnd;

    private HashMap<Long, Float> progressByPlayer;

//    시작 시간
    private long startTime;
    //    시작 시간
    private long paragraphLength;


}
