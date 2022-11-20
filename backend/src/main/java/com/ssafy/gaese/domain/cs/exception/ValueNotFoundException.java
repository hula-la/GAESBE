package com.ssafy.gaese.domain.cs.exception;

public class ValueNotFoundException extends RuntimeException {
    public ValueNotFoundException() {
    }

    public ValueNotFoundException(String message) {
        super(message);
    }

    public ValueNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ValueNotFoundException(Throwable cause) {
        super(cause);
    }
}
