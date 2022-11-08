package com.ssafy.gaese.domain.user.api;

import com.ssafy.gaese.domain.user.application.AttendanceService;
import com.ssafy.gaese.domain.user.application.UserService;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.repository.AttendanceRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.joda.time.LocalDate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/check")
    public ResponseEntity<Boolean> getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        Boolean isCheck = attendanceService.attendanceCheck(user.getId(), LocalDate.now());
        return ResponseEntity.ok().body(isCheck);
    }

}
