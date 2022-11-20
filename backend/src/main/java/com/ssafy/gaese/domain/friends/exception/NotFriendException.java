package com.ssafy.gaese.domain.friends.exception;

public class NotFriendException extends RuntimeException {
    public NotFriendException() {
    }

    public NotFriendException(String message) {
        super(message);
    }

    public NotFriendException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFriendException(Throwable cause) {
        super(cause);
    }
}
