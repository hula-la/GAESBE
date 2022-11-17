package com.ssafy.gaese.domain.user.exception;

public class LevelNotSatisfiedException extends RuntimeException {
    public LevelNotSatisfiedException() {
    }

    public LevelNotSatisfiedException(String message) {
        super(message);
    }

    public LevelNotSatisfiedException(String message, Throwable cause) {
        super(message, cause);
    }

    public LevelNotSatisfiedException(Throwable cause) {
        super(cause);
    }
}
