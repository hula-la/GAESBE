package com.ssafy.gaese.domain.user.controller;

import com.ssafy.gaese.domain.user.application.KakaoUserService;
import com.ssafy.gaese.domain.user.application.NaverUserService;
import com.ssafy.gaese.domain.user.application.UserManageService;
import com.ssafy.gaese.domain.user.dto.TokenDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.dto.account.LoginResponseDto;
import com.ssafy.gaese.domain.user.dto.account.SignupRequestDto;
import com.ssafy.gaese.domain.user.dto.account.kakao.KakaoTokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final KakaoUserService kakaoUserService;
    private final NaverUserService naverUserService;
    private final UserManageService userManageService;


    @GetMapping("/login/kakao")
    public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestBody HashMap<String, String> param) {

        String code = param.get("code");
        System.out.println(code);
        KakaoTokenDto kakaoTokenDto = kakaoUserService.getKakaoAccessToken(code);
        System.out.println("kakaoTokenDto: " + kakaoTokenDto);
        String kakaoAccessToken = kakaoTokenDto.getAccess_token();
        System.out.println("kakaoAccessToken: " + kakaoAccessToken);

        // 토큰 발급까지 authService.kakaologin 상에서 다 처리하자
        LoginResponseDto loginResponseDto = kakaoUserService.kakaoLogin(kakaoAccessToken);

        return ResponseEntity.ok(loginResponseDto);
    }
    @PostMapping("/signup")
    public ResponseEntity<String> kakaoSignup(@RequestBody SignupRequestDto requestDto) {

        // requestDto 로 데이터 받아와서 accountId 반환
        Long userId = kakaoUserService.kakaoSignUp(requestDto);

        // 최초 가입자에게는 RefreshToken, AccessToken 모두 발급
        TokenDto tokenDto = securityService.signup(userId);

        // AccessToken 은 header 에 세팅하고, refreshToken 은 httpOnly 쿠키로 세팅
//        SignupResponseDto signUpResponseDto = new SignupResponseDto();
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie cookie = ResponseCookie.from("RefreshToken", tokenDto.getRefreshToken())
                .maxAge(60*60*24*7) // 쿠키 유효기간 7일로 설정했음
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        headers.add("Set-Cookie", cookie.toString());
        headers.add("Authorization", tokenDto.getAccessToken());

        signUpResponseDto.setResult("가입이 완료되었습니다.");
        return ResponseEntity.ok().headers(headers).body(signUpResponseDto);
    }

    @PostMapping("/kakao")
    public HttpEntity<?> kakaoLogin(@RequestBody HashMap<String, String> param) {
        kakaoUserService.getUserInfoByAccessToken(param.get("Authorization"));
        UserDto userDto = kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
        return kakaoUserService.login(userDto);
    }

    @PostMapping("/naver")
    public HttpEntity<?> naverLogin(@RequestBody HashMap<String, String> param) {
        naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        UserDto userDto = naverUserService.getUserInfoByAccessToken(param.get("access_token"));
        return naverUserService.login(userDto);
    }

    @GetMapping
    public ResponseEntity<UserDto> getInfo(@AuthenticationPrincipal String email) {
        UserDto userInfo = userManageService.getInfo(email);
        return ResponseEntity.ok().body(userInfo);
    }
//
//    @PostMapping
//    public ResponseEntity<BaseResponseBody> modify(
//            @RequestPart(value = "file", required = false) MultipartFile file,
//            @RequestPart(value = "userDto", required = false) UserDto userDto,
//            @AuthenticationPrincipal String email) {
//        UserDto modifyUser = userManageService.modify(userDto, file, email);
//        if(modifyUser == null) return ResponseEntity.status(200).body(BaseResponseBody.of(400, "fail", null));
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", modifyUser));
//    }
//
//    @DeleteMapping
//    public ResponseEntity<BaseResponseBody> delete(@AuthenticationPrincipal String email) {
//        boolean delete = userManageService.delete(email);
//
//        if(!delete) return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", null));
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
//    }
//
//    @PostMapping("/nickname")
//    public ResponseEntity<BaseResponseBody> checkNickname(@RequestBody HashMap<String, String> param) {
//        String nickname = param.get("nickname");
//        boolean check = userManageService.checkNickname(nickname);
//        if(check) return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success", null));
//        else return ResponseEntity.status(400).body(BaseResponseBody.of(400, "fail", null));
//    }

}
