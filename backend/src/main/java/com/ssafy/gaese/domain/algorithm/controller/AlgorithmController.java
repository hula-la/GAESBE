package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoProblemService;
import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordReq;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoSolveReq;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;

@Api(value="Algorithm", tags={"Algorithm"})
@RestController
@Slf4j
@RequestMapping("/algo")
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgoService algoService;
    private final AlgoProblemService algoProblemService;

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

    @PostMapping("/record")
    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
    public ResponseEntity<String> createRecord(@RequestBody AlgoRecordReq algoRecordReq,
                                               @AuthenticationPrincipal CustomUserDetails userDetails){
        algoService.createAlgoRecord(algoRecordReq, userDetails.getId());
        return ResponseEntity.ok().body("success");
    }

    @GetMapping("/record")
    @ApiOperation(value = "알고리즘 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<AlgoRecordDto>> recordList(Pageable pageable,
                                                          @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(algoService.recordList(pageable, userDetails.getId()));
    }

    @GetMapping("/confirm/{roomCode}")
    @ApiOperation(value="입장 가능 여부 판단", notes = "입장 가능 여부 판단")
    public ResponseEntity<Boolean> confirmEnter(@PathVariable String roomCode){

        return ResponseEntity.ok().body(algoService.confirmRoomEnter(roomCode));
    }

    @GetMapping("/problem/{roomCode}/{userBjId}")
    @ApiOperation(value="사용자 푼 문제 크롤링")
    public ResponseEntity<String> getUserProblems(@PathVariable String userBjId, @PathVariable String roomCode){
        algoProblemService.getSolvedProblem(roomCode, userBjId);
        return ResponseEntity.ok().body("success");
    }

    @PostMapping("/solve/{roomCode}")
    public ResponseEntity<Object> checkSolve(@PathVariable String roomCode,
                                             @AuthenticationPrincipal CustomUserDetails userDetails,
                                             @RequestBody AlgoSolveReq algoSolveReq) throws ParseException {
        int result = algoProblemService.confirmSolve(algoSolveReq);
        System.out.println(result);
        HashMap<String,Object> res = new HashMap<>();
        res.put("result",result);
        if( result == 1) {
            algoProblemService.saveUserTime(roomCode,userDetails.getId());
            res.put("msg","맞았습니다 !");
        }else if(result == 0){
            res.put("msg","제출이 확인되지 않았습니다.");
        }else{
            res.put("msg","제출 확인 중 오류가 발생했습니다. 다시 시도해 주세요");
        }

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/bj")
    public ResponseEntity<Object> bjIdCheck(@AuthenticationPrincipal CustomUserDetails userDetails) {

        String bjId = algoService.checkBjId(userDetails.getId());

        HashMap<String , String> res = new HashMap<>();
        res.put("bjId",bjId);

        return ResponseEntity.ok().body(res);
    }
    @GetMapping("/bj/code")
    public ResponseEntity<Object> creatCode(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok().body(algoService.createCode(userDetails.getId()));
    }

    @GetMapping("/bj/code/confirm")
    public ResponseEntity<Object> confirmCode(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok().body(algoService.confirmCode(userDetails.getId()));
    }
}
