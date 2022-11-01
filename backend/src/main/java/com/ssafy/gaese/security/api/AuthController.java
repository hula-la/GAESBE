package com.ssafy.gaese.security.api;

import com.ssafy.gaese.security.application.AuthService;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request,
                                       HttpServletResponse response,
                                       @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok().body(authService.refreshToken(request, response, (String) body.get("oldAccessToken")));
    }
}