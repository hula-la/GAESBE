package com.ssafy.gaese.security.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    EXPIRED_TOKEN(420, "토큰이 만료"),
    NONICKNAME_TOKEN(499, "닉네임이 없음"),
    NOUSER_TOKEN(480, "해당 유저 없음."),
    ALREADYREQ_TOKEN(486, "이미 보낸 친구 요청"),
    REQTOME_TOKEN(450, "이미 보낸 친구 요청"),
    ALREADYREQTOME_TOKEN(487, "친구가 이미 요청 보냄"),
    NOTFRIEND_TOKEN(440, "친구가 아님"),
    ALREADYFRIEND_TOKEN(445, "이미 친구임"),
    ALREADYCHECK_TOKEN(446, "이미 출석체크"),

    LEVELNOTSATISFIED_TOKEN(451, "레벨 미도달"),
    ALREADYOFFICEBUY_TOKEN(452, "이미 가지고 있음");

    private final int code;
    private final String message;

}
