package com.ssafy.gaese.domain.cs.controller;

import com.ssafy.gaese.domain.algorithm.application.AlgoService;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import com.ssafy.gaese.domain.cs.application.CsRedisService;
import com.ssafy.gaese.domain.cs.application.CsService;
import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.user.repository.UserRepository;
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

import java.util.List;

@Api(value="Algorithm", tags={"Algorithm"})
@RestController
@Slf4j
@RequestMapping("/cs")
@RequiredArgsConstructor
public class CsController {

    private final CsService csService;

    /* user email -> jwt 로 수정 */
//    @PostMapping("/record/{email}")
//    @ApiOperation(value = "알고리즘 게임 기록 등록", notes = "알고리즘 게임 기록 등록")
//    public ResponseEntity<String> createRecord(@RequestBody CsRecordDto csRecordDto,
//                                               @AuthenticationPrincipal CustomUserDetails userDetails){
//        System.out.println(algoRecordDto.toString());
//        csService.createCsRecord(algoRecordDto, userDetails.getId());
//        return ResponseEntity.ok().body("success");
//    }

    @GetMapping("/record")
    @ApiOperation(value = "cs 게임 기록 조회", notes = "사용자별 알고리즘 게임 기록 조회")
    public ResponseEntity<Page<CsRecordDto>> recordList(Pageable pageable,
                                                        @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok().body(csService.findCsRecord(userDetails.getId(),pageable));
    }

}
