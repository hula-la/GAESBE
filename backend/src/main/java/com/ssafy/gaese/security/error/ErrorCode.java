package com.ssafy.gaese.security.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    EXPIRED_TOKEN(420, "토큰이 만료"),
    NONICKNAME_TOKEN(499, "닉네임이 없음"),
    NOUSER_TOKEN(480, "해당 유저 없음.");

    private final int code;
    private final String message;

}
