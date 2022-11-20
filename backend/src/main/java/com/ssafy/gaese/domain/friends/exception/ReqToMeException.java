package com.ssafy.gaese.domain.friends.exception;

public class ReqToMeException extends RuntimeException {
    public ReqToMeException() {
    }

    public ReqToMeException(String message) {
        super(message);
    }

    public ReqToMeException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReqToMeException(Throwable cause) {
        super(cause);
    }
}
