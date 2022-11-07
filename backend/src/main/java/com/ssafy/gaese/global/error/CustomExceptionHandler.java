package com.ssafy.gaese.global.error;

import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.security.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.rmi.ServerError;


@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {UserNotFoundException.class})
    public ResponseEntity<Object> handleUserNotFoundException(ServerError ex){
        ErrorCode ec = ErrorCode.NOUSER_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }



}
