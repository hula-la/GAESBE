package com.ssafy.gaese.domain.ssafyGame.controller;

import com.ssafy.gaese.domain.ssafyGame.application.SsafyGameService;
import com.ssafy.gaese.domain.ssafyGame.dto.FiveResultDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipParamDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipResultDto;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/ssafy")
@RequiredArgsConstructor
public class SsafyGameController {

    private final SsafyGameService ssafyGameService;

    //금액이 부족하면 null 반환 함
    @PostMapping("/flip")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<FlipResultDto> filp(@RequestBody FlipParamDto param,
                                              @AuthenticationPrincipal CustomUserDetails userDetails){
        
        return ResponseEntity.ok().body(ssafyGameService.flipStart(param, userDetails.getId()));
    }

    @PostMapping("/five")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<FiveResultDto> getFive(@AuthenticationPrincipal CustomUserDetails userDetails){

        return ResponseEntity.ok().body(ssafyGameService.getFive(userDetails.getId()));
    }
}
