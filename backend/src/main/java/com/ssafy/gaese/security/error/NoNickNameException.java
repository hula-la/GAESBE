package com.ssafy.gaese.security.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoNickNameException extends RuntimeException {
    public NoNickNameException(String message) {
        super(message);
    }

    public NoNickNameException(String message, Throwable cause) {
        super(message, cause);
    }
}