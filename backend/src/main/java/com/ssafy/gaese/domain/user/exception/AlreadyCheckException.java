package com.ssafy.gaese.domain.user.exception;

public class AlreadyCheckException extends RuntimeException {
    public AlreadyCheckException() {
    }

    public AlreadyCheckException(String message) {
        super(message);
    }

    public AlreadyCheckException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyCheckException(Throwable cause) {
        super(cause);
    }
}
