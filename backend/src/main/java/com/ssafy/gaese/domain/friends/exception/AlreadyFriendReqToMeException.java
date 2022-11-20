package com.ssafy.gaese.domain.friends.exception;

public class AlreadyFriendReqToMeException extends RuntimeException {
    public AlreadyFriendReqToMeException() {
    }

    public AlreadyFriendReqToMeException(String message) {
        super(message);
    }

    public AlreadyFriendReqToMeException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyFriendReqToMeException(Throwable cause) {
        super(cause);
    }
}
