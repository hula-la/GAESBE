package com.ssafy.gaese.domain.user.exception;

public class LevelNotSatisfiedException extends RuntimeException {
    public LevelNotReachException() {
    }

    public LevelNotReachException(String message) {
        super(message);
    }

    public LevelNotReachException(String message, Throwable cause) {
        super(message, cause);
    }

    public LevelNotReachException(Throwable cause) {
        super(cause);
    }
}
