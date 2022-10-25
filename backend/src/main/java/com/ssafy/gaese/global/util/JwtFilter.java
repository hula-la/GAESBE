package com.ssafy.gaese.global.util;

import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);


    private UserRepository userRepository;

    public static final String AUTHORIZATION_HEADER = "access-token";

    private final TokenProvider tokenProvider;

    public JwtFilter(TokenProvider tokenProvider, UserRepository userRepository) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @Override // 실제 필터링 로직으로, JWT 토큰의 인증정보를 현재 실행중인 SecurityContext에 저장하는 역할 수행
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        System.out.println("필터들어옴");
        // Request에서 토큰을 받아서
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String jwt = resolveToken(httpServletRequest);
        String requestURI = httpServletRequest.getRequestURI();

        // jwt 가 없으면
//        if (jwt==null) return;

        // 토큰의 유효성을 검사하고 (validateToken(jwt))
        if (jwt!=null&&StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            // 정상이면 Authentication 객체를 받아와서
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            // SecurityContext에 set 해준다.
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String email = (String) authentication.getPrincipal();

            Optional<User> user = userRepository.findByEmail(email);

            if (!user.isPresent()) throw new UserNotFoundException();

            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    // Request Header에서 토큰 정보를 꺼내오는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
//        if (StringUtils.hasText(bearerToken)) {
//            return bearerToken;
//        }

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}