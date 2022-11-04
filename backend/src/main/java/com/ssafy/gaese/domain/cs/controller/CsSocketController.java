package com.ssafy.gaese.domain.cs.controller;

import com.ssafy.gaese.domain.cs.application.CsRoomService;
import com.ssafy.gaese.domain.cs.application.CsService;
import com.ssafy.gaese.domain.cs.dto.CsSocketDto;
import com.ssafy.gaese.domain.cs.dto.CsSubmitDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CsSocketController {
     // broker로 메시지 전달
    private final CsRoomService csRoomService;
    private final CsService csService;

    // 알고리즘 방 입장/나가기
    @MessageMapping("/cs")
    public void algoRoom(CsSocketDto csSocketDto) throws Exception{
        csRoomService.enterOrLeave(csSocketDto);
    }

    // 문제 제출
    @MessageMapping("/submit")
    public void submitAnswer(CsSubmitDto csSubmitDto) throws Exception{
        csService.submitAnswer(csSubmitDto);
    }


}
