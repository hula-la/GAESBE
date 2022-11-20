package com.ssafy.gaese.domain.user.exception;

public class UserSameException extends RuntimeException {
    public UserSameException() {
    }

    public UserSameException(String message) {
        super(message);
    }

    public UserSameException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserSameException(Throwable cause) {
        super(cause);
    }
}
