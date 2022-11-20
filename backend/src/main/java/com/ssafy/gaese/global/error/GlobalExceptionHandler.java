package com.ssafy.gaese.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.rmi.ServerError;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Getter
    @AllArgsConstructor
    enum ErrorCode {

        INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "Invalid parameter included"),
        RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Resource not exists"),
        INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
        ;

        private HttpStatus httpStatus;
        private String message;
    }

    @ExceptionHandler(value = {ServerError.class})
    public ResponseEntity<Object> handleServerException(ServerError ex){
        ErrorCode ec = ErrorCode.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(ec.getHttpStatus()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ResponseEntity<Object> handleIllegalArgumentException(ServerError ex){
        ErrorCode ec = ErrorCode.INVALID_PARAMETER;
        return ResponseEntity.status(ec.getHttpStatus()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }

}
