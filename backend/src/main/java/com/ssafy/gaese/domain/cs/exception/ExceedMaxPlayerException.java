package com.ssafy.gaese.domain.cs.exception;

import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import lombok.Getter;

@Getter
public class ExceedMaxPlayerException extends RuntimeException {
    private CsSocketDto csSocketDto;

    public ExceedMaxPlayerException() {
    }

    public ExceedMaxPlayerException(String message) {
        super(message);
    }

    public ExceedMaxPlayerException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExceedMaxPlayerException(CsSocketDto csSocketDto) {
        this.csSocketDto = csSocketDto;
    }
}
