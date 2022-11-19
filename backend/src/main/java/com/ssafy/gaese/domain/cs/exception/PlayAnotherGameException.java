package com.ssafy.gaese.domain.cs.exception;

import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.Getter;

@Getter
public class PlayAnotherGameException extends RuntimeException {
    private BaseSocketDto SocketDto;

    public PlayAnotherGameException() {
    }

    public PlayAnotherGameException(String message) {
        super(message);
    }

    public PlayAnotherGameException(String message, Throwable cause) {
        super(message, cause);
    }

    public PlayAnotherGameException(Throwable cause) {
        super(cause);
    }
    public PlayAnotherGameException(BaseSocketDto SocketDto) {
        this.SocketDto = SocketDto;
    }

}
