package com.ssafy.gaese.domain.cs.exception;

public class PlayAnotherGameException extends RuntimeException {
    public PlayAnotherGameException() {
    }

    public PlayAnotherGameException(String message) {
        super(message);
    }

    public PlayAnotherGameException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlayAnotherGameException(Throwable cause) {
        super(cause);
    }
}
