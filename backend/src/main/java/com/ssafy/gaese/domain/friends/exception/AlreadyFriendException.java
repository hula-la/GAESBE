package com.ssafy.gaese.domain.friends.exception;

public class AlreadyFriendException extends RuntimeException {
    public AlreadyFriendException() {
    }

    public AlreadyFriendException(String message) {
        super(message);
    }

    public AlreadyFriendException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyFriendException(Throwable cause) {
        super(cause);
    }
}
