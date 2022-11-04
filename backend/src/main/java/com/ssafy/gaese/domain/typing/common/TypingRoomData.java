package com.ssafy.gaese.domain.typing.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypingRoomData {
    String content;

    String lang;
    //랜매는 null
    String roomCode;
    //생성시 방장의 socketId 로 세팅
    String roomNo;

    //분*60+초  분까지만 사용 시 바뀌는 경우는 예외처리로 계산
    int startTime;

    List<TypingUserData> users;


}
