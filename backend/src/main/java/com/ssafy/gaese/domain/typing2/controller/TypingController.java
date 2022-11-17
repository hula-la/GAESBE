package com.ssafy.gaese.domain.typing2.controller;

import com.ssafy.gaese.domain.typing2.application.TypingService;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.typing2.entity.TypingParagraph;
import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.domain.typing2.repository.TypingParagraphRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value="typing", tags={"typing"})
@RestController
@Slf4j
@RequestMapping("/typing")
@RequiredArgsConstructor
public class TypingController {

    private final TypingService typingService;
    private final com.ssafy.gaese.domain.typing2.repository.TypingParagraphRepository typingParagraphRepository;


    @GetMapping("/record")
    @ApiOperation(value = "typing 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<TypingRecordDto>> recordList(Pageable pageable,
                                                            @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(typingService.findTypingRecord(userDetails.getId(),pageable));
    }




    @GetMapping("/find")
    @ApiOperation(value = "typing  게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<List<TypingParagraph>> test(int problemNum, TypingRecord.LangType langType){
        return ResponseEntity.ok().body(typingParagraphRepository.findRandomProblem(problemNum,langType.name()));
    }

}
