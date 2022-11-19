package com.ssafy.gaese.global.error;

import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.cs.exception.AlreadyGameStartException;
import com.ssafy.gaese.domain.cs.exception.ExceedMaxPlayerException;
import com.ssafy.gaese.domain.cs.exception.PlayAnotherGameException;
import com.ssafy.gaese.domain.cs.exception.RoomNotFoundException;
import com.ssafy.gaese.domain.friends.exception.*;
import com.ssafy.gaese.domain.user.exception.AlreadyCheckException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.global.Dto.BaseSocketDto;
import com.ssafy.gaese.security.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;


@ControllerAdvice
@RequiredArgsConstructor
public class CustomExceptionSocketHandler {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageExceptionHandler(value = {ExceedMaxPlayerException.class})
    public void handleExceedMaxPlayerException(ExceedMaxPlayerException exceedMaxPlayerException){
        BaseSocketDto socketDto = exceedMaxPlayerException.getSocketDto();

        if (socketDto!=null){
            HashMap<String, String> res = new HashMap<>();
            res.put("errorMsg","인원이 다 찼습니다.");
            simpMessagingTemplate.convertAndSend("/friend/"+ socketDto.getUserId(),res);
        }
    }
    @MessageExceptionHandler(value = {PlayAnotherGameException.class})
    public void handlePlayAnotherGameException(PlayAnotherGameException playAnotherGameException){
        BaseSocketDto socketDto = playAnotherGameException.getSocketDto();

        if (socketDto!=null){
            HashMap<String, String> res = new HashMap<>();
            res.put("errorMsg","이미 다른 게임 중입니다.");
            simpMessagingTemplate.convertAndSend("/friend/"+ socketDto.getUserId(),res);
        }

    }
    @MessageExceptionHandler(value = {RoomNotFoundException.class})
    public void handleRoomNotFoundException(RoomNotFoundException roomNotFoundException){
        BaseSocketDto socketDto = roomNotFoundException.getSocketDto();

        if (socketDto!=null){
            HashMap<String, String> res = new HashMap<>();
            res.put("errorMsg","방이 존재하지 않습니다.");
            simpMessagingTemplate.convertAndSend("/friend/"+ socketDto.getUserId(),res);
        }
    }

    @MessageExceptionHandler(value = {AlreadyGameStartException.class})
    public void handleAlreadyGameStartException(AlreadyGameStartException alreadyGameStartException){
        BaseSocketDto socketDto = alreadyGameStartException.getSocketDto();

        if (socketDto!=null){
            HashMap<String, String> res = new HashMap<>();
            res.put("errorMsg","이미 게임이 진행 중인 방입니다.");
            simpMessagingTemplate.convertAndSend("/friend/"+ socketDto.getUserId(),res);
        }
    }




}
