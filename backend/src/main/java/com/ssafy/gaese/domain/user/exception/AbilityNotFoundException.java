package com.ssafy.gaese.domain.user.exception;

public class AbilityNotFoundException extends RuntimeException {
    public AbilityNotFoundException() {
    }

    public AbilityNotFoundException(String message) {
        super(message);
    }

    public AbilityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AbilityNotFoundException(Throwable cause) {
        super(cause);
    }
}
