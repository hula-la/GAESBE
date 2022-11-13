package com.ssafy.gaese.domain.user.api;

import com.ssafy.gaese.domain.user.application.AbilityService;
import com.ssafy.gaese.domain.user.application.UserService;
import com.ssafy.gaese.domain.user.dto.AbilityDto;
import com.ssafy.gaese.domain.user.dto.RankDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/ability")
public class AbilityController {

    private final AbilityService abilityService;

    @GetMapping("/me")
    public ResponseEntity<AbilityDto> getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        AbilityDto abilityDto = abilityService.getAbility(user.getId());
        return ResponseEntity.ok().body(abilityDto);
    }

    @GetMapping("/rank")
    public ResponseEntity<RankDto> getRank(@AuthenticationPrincipal CustomUserDetails user) {
        RankDto rankDto = abilityService.getRank(user.getId());
        return ResponseEntity.ok().body(rankDto);
    }

}
