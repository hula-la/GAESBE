package com.ssafy.gaese.domain.cs.exception;

public class ExceedMaxPlayerException extends RuntimeException {
    public ExceedMaxPlayerException() {
    }

    public ExceedMaxPlayerException(String message) {
        super(message);
    }

    public ExceedMaxPlayerException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExceedMaxPlayerException(Throwable cause) {
        super(cause);
    }
}
