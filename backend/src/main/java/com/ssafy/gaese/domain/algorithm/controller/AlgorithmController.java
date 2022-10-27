package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="Algorithm", tags={"Algorithm"})
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/algo")
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgoService algoService;

//    @PostMapping("/room")
//    @ApiOperation(value = "생성된 알고리즘 방 조회", notes = "알고리즘 게임 기록 등록")
//    public ResponseEntity<String> roomList(){
//
//    }

    /* user email -> jwt 로 수정 */
    @PostMapping("/record/{email}")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<String> createRecord(@RequestBody AlgoRecordDto algoRecordDto, @PathVariable String email){
        System.out.println(algoRecordDto.toString());
        algoService.createAlgoRecord(algoRecordDto, email);
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/record/{email}")
    @ApiOperation(value = "알고리즘 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<AlgoRecordDto>> recordList(Pageable pageable, @PathVariable String email){
        return ResponseEntity.ok().body(algoService.recordList(pageable, email));
    }

}
