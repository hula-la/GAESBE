package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/room")
    @ApiOperation(value = "생성된 알고리즘 방 조회", notes = "생성된 알고리즘 방 조회")
    public ResponseEntity<List<AlgoRoomDto>> roomList(){
        return ResponseEntity.ok().body(algoService.getRooms());
    }

    @PostMapping("/room")
    @ApiOperation(value = "알고리즘 방 생성", notes = "방 생성")
    public ResponseEntity<AlgoRoomDto> createRoom(@RequestBody  AlgoRoomDto algoRoomDto){
        return ResponseEntity.ok().body(algoService.createRoom(algoRoomDto));
    }

    @DeleteMapping("/room/{code}")
    @ApiOperation(value = "알고리즘 방 삭제", notes = "방 삭제")
    public ResponseEntity<String> deleteRoom(@PathVariable String code){
        if (algoService.deleteRoom(code)==1l)
            return ResponseEntity.ok().body("방 삭제 성공");
        return ResponseEntity.status(400).body("방 삭제 실패");
    }

    /* user email -> jwt 로 수정 */
    @PostMapping("/record/{email}")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<String> createRecord(@RequestBody AlgoRecordDto algoRecordDto,
                                               @AuthenticationPrincipal CustomUserDetails userDetails){
        System.out.println(algoRecordDto.toString());
        algoService.createAlgoRecord(algoRecordDto, userDetails.getId());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/record/{email}")
    @ApiOperation(value = "알고리즘 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<AlgoRecordDto>> recordList(Pageable pageable,
                                                          @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(algoService.recordList(pageable, userDetails.getId()));
    }

}
