package com.ssafy.gaese.security.util.handler;

import com.ssafy.gaese.security.error.ErrorCode;
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
        int exception = (int) request.getAttribute("exception");
        if (exception==ErrorCode.NONICKNAME_TOKEN.getCode()) {
            response.sendError(ErrorCode.NONICKNAME_TOKEN.getCode(), ErrorCode.NONICKNAME_TOKEN.getMessage());
        } else if (exception==ErrorCode.EXPIRED_TOKEN.getCode()) {
            response.sendError(ErrorCode.EXPIRED_TOKEN.getCode(), ErrorCode.EXPIRED_TOKEN.getMessage());
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getLocalizedMessage());
        }

    }
}