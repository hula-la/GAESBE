package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value="Algorithm", tags={"Algorithm"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/algo")
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgoService algoService;

    /* user email -> jwt 로 수정 */
    @PostMapping("/record/{email}")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<String> createRecord(@RequestBody AlgoRecordDto algoRecordDto, @PathVariable String email){
        System.out.println(algoRecordDto.toString());
        algoService.createAlgoRecord(algoRecordDto, email);
        return ResponseEntity.ok().body("success");
    }

}
