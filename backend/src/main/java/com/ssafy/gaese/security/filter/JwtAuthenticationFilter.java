package com.ssafy.gaese.security.filter;

import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.error.ErrorCode;
import com.ssafy.gaese.security.error.NoNickNameException;
import com.ssafy.gaese.security.model.CustomUserDetails;
import com.ssafy.gaese.security.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = parseBearerToken(request);

        // Validation Access Token
        if (StringUtils.hasText(token) && tokenProvider.validateToken(token, request)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug(authentication.getName() + "의 인증정보 저장");

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            Long userId = userDetails.getId();


            if (userRepository.getNickNameById(userId)==""||userRepository.getNickNameById(userId)==null){
                String requestURI = request.getRequestURI();

                request.setAttribute("exception", ErrorCode.NONICKNAME_TOKEN.getCode());


                throw new NoNickNameException("닉네임 없음");
//                return;
            }
        } else {
            log.debug("유효한 JWT 토큰이 없습니다.");
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}