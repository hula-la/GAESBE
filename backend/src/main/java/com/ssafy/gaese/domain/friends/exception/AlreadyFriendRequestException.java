package com.ssafy.gaese.domain.friends.exception;

public class AlreadyFriendRequestException extends RuntimeException {
    public AlreadyFriendRequestException() {
    }

    public AlreadyFriendRequestException(String message) {
        super(message);
    }

    public AlreadyFriendRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyFriendRequestException(Throwable cause) {
        super(cause);
    }
}
