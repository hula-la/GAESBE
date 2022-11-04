package com.ssafy.gaese.domain.cs.exception;

public class ExceedTimeException extends RuntimeException {
    public ExceedTimeException() {
    }

    public ExceedTimeException(String message) {
        super(message);
    }

    public ExceedTimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExceedTimeException(Throwable cause) {
        super(cause);
    }
}
