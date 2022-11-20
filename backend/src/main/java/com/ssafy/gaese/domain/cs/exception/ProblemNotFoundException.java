package com.ssafy.gaese.domain.cs.exception;

public class ProblemNotFoundException extends RuntimeException {
    public ProblemNotFoundException() {
    }

    public ProblemNotFoundException(String message) {
        super(message);
    }

    public ProblemNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProblemNotFoundException(Throwable cause) {
        super(cause);
    }
}
