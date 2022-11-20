package com.ssafy.gaese.domain.cs.exception;

import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.Getter;

@Getter
public class RoomNotFoundException extends RuntimeException {

    private BaseSocketDto SocketDto;

    public RoomNotFoundException() {
    }

    public RoomNotFoundException(String message) {
        super(message);
    }

    public RoomNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RoomNotFoundException(Throwable cause) {
        super(cause);
    }

    public RoomNotFoundException(BaseSocketDto SocketDto) {
        this.SocketDto = SocketDto;
    }

}
