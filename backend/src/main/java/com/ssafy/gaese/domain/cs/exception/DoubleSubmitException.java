package com.ssafy.gaese.domain.cs.exception;

public class DoubleSubmitException extends RuntimeException {
    public DoubleSubmitException() {
    }

    public DoubleSubmitException(String message) {
        super(message);
    }

    public DoubleSubmitException(String message, Throwable cause) {
        super(message, cause);
    }

    public DoubleSubmitException(Throwable cause) {
        super(cause);
    }
}
