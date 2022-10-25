package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.dto.LoginDto;
import com.ssafy.gaese.domain.user.dto.TokenDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.LoginType;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.util.JwtFilter;
import com.ssafy.gaese.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserLoginService {


    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<TokenDto> login(LoginDto loginDto) {
        //  LoginDto의 userName,Password를 받아서 UsernamePasswordAuthenticationToken 객체를 생성한다
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        log.info(authenticationToken.toString());
        // authenticationToken 을 이용해서 Authentication 객체를 생성하려고 authenticate메서드가 실행될때
        // CustomUserDetailsService 의 loadUserByUsername 메서드가 실행된다.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 생성된 Authentication 객체를 SecurityContextHolder에 저장하고,
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 그 인증정보를 기반으로 토큰을 생성한다
        String jwt = tokenProvider.createToken(authentication);
        HttpHeaders httpHeaders = new HttpHeaders();
        // 생성한 토큰을 Response 헤더에 넣어주고,
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        log.info("jwt : " + jwt);
//         TokenDto에도 넣어서 RequestBody로 리턴해준다
        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<User> signup(UserDto userDto, LoginType loginType) {
        userDto.setSocialId(passwordEncoder.encode(userDto.getSocialId()));
        User user = userDto.toEntity(loginType);
        userRepository.save(user);
        return ResponseEntity.ok().body(user);
    }
}
