package com.ssafy.gaese.domain.ssafyGame.controller;

import com.ssafy.gaese.domain.ssafyGame.application.SsafyGameService;
import com.ssafy.gaese.domain.ssafyGame.dto.FiveResultDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipParamDto;
import com.ssafy.gaese.domain.ssafyGame.dto.FlipResultDto;
import com.ssafy.gaese.domain.ssafyGame.dto.SsafyRecordDto;
import com.ssafy.gaese.domain.typing2.application.TypingService;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/ssafy")
@RequiredArgsConstructor
public class SsafyGameController {

    private final SsafyGameService ssafyGameService;

//    private final SsafyGameService typingService;

    @PostMapping("/flip")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<FlipResultDto> filp(@RequestBody FlipParamDto param,
                                              @AuthenticationPrincipal CustomUserDetails userDetails){
        
        return ResponseEntity.ok().body(ssafyGameService.flipStart(param, userDetails.getId()));
    }

    @GetMapping("/five")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<FiveResultDto> getFive(@AuthenticationPrincipal CustomUserDetails userDetails){

        return ResponseEntity.ok().body(ssafyGameService.getFive(userDetails.getId()));
    }


    @GetMapping("/record")
    @ApiOperation(value = "typing 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<SsafyRecordDto>> recordList(Pageable pageable,
                                                           @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(ssafyGameService.findTypingRecord(userDetails.getId(),pageable));
    }

    @GetMapping("/record/rank")
    @ApiOperation(value = "typing 게임 1등 갯수 출력", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Integer> getWinCount(@AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(ssafyGameService.getWinCount(userDetails.getId()));
    }
}
