package com.ssafy.gaese.domain.algorithm.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoProblemService;
import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.*;
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

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;

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
        algoService.deleteRoom(code);
        return ResponseEntity.ok().body("방 삭제 성공");
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
    public ResponseEntity<Boolean> confirmEnter(@PathVariable String roomCode,
                                                @AuthenticationPrincipal CustomUserDetails userDetails){

        return ResponseEntity.ok().body(algoService.confirmRoomEnter(roomCode));
    }

    @GetMapping("/user/problem/{roomCode}/{userBjId}")
    @ApiOperation(value="사용자 푼 문제 크롤링")
    public ResponseEntity<String> getUserProblems(@PathVariable String userBjId, @PathVariable String roomCode){
        algoProblemService.getSolvedProblem(roomCode, userBjId);
        return ResponseEntity.ok().body("success");
    }

    @PostMapping("/solve/{roomCode}")
    @ApiOperation(value="문제 맞춤 여부 확인")
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
        }else{
            res.put("msg","제출이 확인되지 않았습니다.");
        }

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/bj")
    @ApiOperation(value="백중 아이디 저장 유무 확인")
    public ResponseEntity<Object> bjIdCheck(@AuthenticationPrincipal CustomUserDetails userDetails) {

        String bjId = algoService.checkBjId(userDetails.getId());

        HashMap<String , String> res = new HashMap<>();
        res.put("bjId",bjId);

        return ResponseEntity.ok().body(res);
    }
    @GetMapping("/bj/code")
    @ApiOperation(value="백중 아이디 연동 코드 전송")
    public ResponseEntity<Object> creatCode(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok().body(algoService.createCode(userDetails.getId()));
    }

    @GetMapping("/bj/code/confirm")
    @ApiOperation(value="백중 아이디 연동 확인")
    public ResponseEntity<Object> confirmCode(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok().body(algoService.confirmCode(userDetails.getId()));
    }
    @PostMapping("/test")
    public void test(@RequestBody AlgoProblemReq algoProblemReq) throws IOException, ExecutionException, InterruptedException {
        algoProblemService.getCommonProblems(algoProblemReq);
    }
}
