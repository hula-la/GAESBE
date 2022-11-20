package com.ssafy.gaese.domain.typing2.exception;

public class AlreadyEndException extends RuntimeException {
    public AlreadyEndException() {
    }

    public AlreadyEndException(String message) {
        super(message);
    }

    public AlreadyEndException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyEndException(Throwable cause) {
        super(cause);
    }
}
