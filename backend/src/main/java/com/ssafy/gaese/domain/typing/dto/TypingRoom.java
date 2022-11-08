package com.ssafy.gaese.domain.typing.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@RedisHash("TypingRoom")
public class TypingRoom {


    //생성시 방장의 socketId 로 세팅
    @Id
    String roomNo;

    String roomCode;

    String content;

    String lang;
    //랜매는 null

    boolean isStart;

    //분*60+초  분까지만 사용 시 바뀌는 경우는 예외처리로 계산
    Integer startTime;

    List<TypingUser> users;

}
