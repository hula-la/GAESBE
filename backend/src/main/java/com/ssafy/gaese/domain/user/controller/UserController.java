package com.ssafy.gaese.domain.user.controller;

import com.ssafy.gaese.domain.user.application.KakaoUserService;
import com.ssafy.gaese.domain.user.application.NaverUserService;
import com.ssafy.gaese.domain.user.application.UserManageService;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    private final RedisUtil redisUtil;

    @PostMapping("/kakao")
    public HttpEntity<?> kakaoLogin(@RequestBody HashMap<String, String> param) {
        kakaoUserService.getUserInfoByAccessToken(param.get("access_token"));
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
    public ResponseEntity<BaseResponseBody> getInfo(@AuthenticationPrincipal String email) {
        UserDto userInfo = userManageService.getInfo(email);
        return ResponseEntity.ok().body(BaseResponseBody.of(200, "success", userInfo));
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
