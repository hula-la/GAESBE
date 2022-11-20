package com.ssafy.gaese.domain.cs.exception;

import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.Getter;

@Getter
public class AlreadyGameStartException extends RuntimeException {

    private BaseSocketDto SocketDto;

    public AlreadyGameStartException() {
    }

    public AlreadyGameStartException(String message) {
        super(message);
    }

    public AlreadyGameStartException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyGameStartException(Throwable cause) {
        super(cause);
    }

    public AlreadyGameStartException(BaseSocketDto SocketDto) {
        this.SocketDto = SocketDto;
    }

}
