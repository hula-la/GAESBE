package com.ssafy.gaese.domain.cs.exception;

import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.Getter;

@Getter
public class ExceedMaxPlayerException extends RuntimeException {
    private BaseSocketDto SocketDto;

    public ExceedMaxPlayerException() {
    }

    public ExceedMaxPlayerException(String message) {
        super(message);
    }

    public ExceedMaxPlayerException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExceedMaxPlayerException(BaseSocketDto SocketDto) {
        this.SocketDto = SocketDto;
    }
}
