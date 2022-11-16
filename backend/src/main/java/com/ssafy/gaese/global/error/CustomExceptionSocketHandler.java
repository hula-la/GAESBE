package com.ssafy.gaese.global.error;

import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.cs.exception.ExceedMaxPlayerException;
import com.ssafy.gaese.domain.friends.exception.*;
import com.ssafy.gaese.domain.user.exception.AlreadyCheckException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
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
        CsSocketDto csSocketDto = exceedMaxPlayerException.getCsSocketDto();

        HashMap<String, String> res = new HashMap<>();
        res.put("errorMsg","방 인원이 꽉 찼습니다.");
        simpMessagingTemplate.convertAndSend("/cs/"+ csSocketDto.getUserId(),res);
    }




}
