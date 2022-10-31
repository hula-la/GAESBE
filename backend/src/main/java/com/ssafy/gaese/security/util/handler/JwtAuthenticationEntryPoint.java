package com.ssafy.gaese.security.util.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String exception = (String)request.getAttribute("exception");
        if (exception =="NoNickName"){
            response.sendError(513,"닉네임 없음");
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getLocalizedMessage());
        }

    }
}