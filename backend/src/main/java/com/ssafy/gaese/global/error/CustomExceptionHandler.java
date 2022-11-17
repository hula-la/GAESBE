package com.ssafy.gaese.global.error;

import com.ssafy.gaese.domain.friends.exception.AlreadyFriendException;
import com.ssafy.gaese.domain.friends.exception.AlreadyFriendReqToMeException;
import com.ssafy.gaese.domain.friends.exception.AlreadyFriendRequestException;
import com.ssafy.gaese.domain.friends.exception.NotFriendException;
import com.ssafy.gaese.domain.friends.exception.ReqToMeException;
import com.ssafy.gaese.domain.user.exception.AlreadyCheckException;
import com.ssafy.gaese.domain.user.exception.AlreadyOfficeBuyException;
import com.ssafy.gaese.domain.user.exception.LevelNotSatisfiedException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.security.error.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.rmi.ServerError;


@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {UserNotFoundException.class})
    public ResponseEntity<Object> handleUserNotFoundException(){
        ErrorCode ec = ErrorCode.NOUSER_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {AlreadyFriendRequestException.class})
    public ResponseEntity<Object> handleAlreadyFriendRequestException(){
        ErrorCode ec = ErrorCode.ALREADYREQ_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {ReqToMeException.class})
    public ResponseEntity<Object> handleReqToMeException(){
        ErrorCode ec = ErrorCode.REQTOME_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {AlreadyFriendReqToMeException.class})
    public ResponseEntity<Object> handleAlreadyFriendReqToMeException(){
        ErrorCode ec = ErrorCode.ALREADYREQTOME_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {NotFriendException.class})
    public ResponseEntity<Object> handleNotFriendException(){
        ErrorCode ec = ErrorCode.NOTFRIEND_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {AlreadyFriendException.class})
    public ResponseEntity<Object> handleAlreadyFriendException(){
        ErrorCode ec = ErrorCode.ALREADYFRIEND_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }
    @ExceptionHandler(value = {AlreadyCheckException.class})
    public ResponseEntity<Object> handleAlreadyCheckException(){
        ErrorCode ec = ErrorCode.ALREADYCHECK_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }

    @ExceptionHandler(value = {LevelNotSatisfiedException.class})
    public ResponseEntity<Object> handleLevelNotSatisfiedException(){
        ErrorCode ec = ErrorCode.LEVELNOTSATISFIED_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }

    @ExceptionHandler(value = {AlreadyOfficeBuyException.class})
    public ResponseEntity<Object> handleAlreadyOfficeBuyException(){
        ErrorCode ec = ErrorCode.ALREADYOFFICEBUY_TOKEN;
        return ResponseEntity.status(ec.getCode()).body(ErrorResponseBody.of(ec.name(),ec.getMessage()));
    }



}
