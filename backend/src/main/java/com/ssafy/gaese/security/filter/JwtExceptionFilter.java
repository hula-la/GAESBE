package com.ssafy.gaese.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");

        logger.info("jwtExceptionFilter 실행");
        try{
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e){

            logger.info("expiredJwtException 터짐");
            Map<String, String> map = new HashMap<>();

            map.put("errortype", "Forbidden");
            map.put("code", "402");
            map.put("message", "만료된 토큰입니다. Refresh 토큰이 필요합니다.");

            logger.error("만료된 토큰");
            response.getWriter().write(objectMapper.writeValueAsString(map));

//            logger.info("생성된 response = {}", response);
        } catch (JwtException e){
            logger.info("JwtException 터짐");
            Map<String, String> map = new HashMap<>();

            map.put("errortype", "Forbidden");
            map.put("code", "400");
            map.put("message", "변조된 토큰입니다. 로그인이 필요합니다.");

            logger.error("변조된 토큰");
            response.getWriter().write(objectMapper.writeValueAsString(map));
        } catch (IOException e) {
            logger.info("IOException 터짐");
            Map<String, String> map = new HashMap<>();

            map.put("errortype", "Forbidden");
            map.put("code", "500");
            map.put("message", "입출력 에러가 발생했습니다.");

            logger.error("변조된 토큰");
            response.getWriter().write(objectMapper.writeValueAsString(map));
        }
    }
}