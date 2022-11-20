package com.ssafy.gaese.global.error;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponseBody extends RuntimeException {
    private final String name;
    private final String message;

    public static ErrorResponseBody of(String name, String message){
        return ErrorResponseBody.builder()
                .name(name)
                .message(message)
                .build();
    }

}
