package com.ssafy.gaese.domain.user.exception;

public class AlreadyOfficeBuyException extends RuntimeException {
    public AlreadyOfficeBuyException() {
    }

    public AlreadyOfficeBuyException(String message) {
        super(message);
    }

    public AlreadyOfficeBuyException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyOfficeBuyException(Throwable cause) {
        super(cause);
    }
}
