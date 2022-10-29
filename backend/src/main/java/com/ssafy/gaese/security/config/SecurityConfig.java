package com.ssafy.gaese.security.config;

import com.ssafy.gaese.security.filter.JwtAuthenticationFilter;
import com.ssafy.gaese.security.application.CustomOAuth2UserService;
import com.ssafy.gaese.security.util.CookieAuthorizationRequestRepository;
import com.ssafy.gaese.security.util.handler.JwtAccessDeniedHandler;
import com.ssafy.gaese.security.util.handler.JwtAuthenticationEntryPoint;
import com.ssafy.gaese.security.util.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.gaese.security.util.handler.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Log4j2
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    private final OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler authenticationFailureHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/h2-console/**", "/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/oauth2/**", "/auth/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated();

        http.cors()                     // CORS on
                .and()
                .csrf().disable()           // CSRF off
                .httpBasic().disable()      // Basic Auth off
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);    // Session off

        http.formLogin().disable()
                .oauth2Login()
                // 프론트에서 백으로 소셜로그인 요청을 보내는 URI
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                .and()
                // Authorization 과정이 끝나면 `Authorization Code`와 함께 리다이렉트할 URI
                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
                // Provider로부터 획득한 유저정보를 다룰 service class를 지정합니다
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                // OAuth2 로그인 성공시 호출할 handler
                .successHandler(authenticationSuccessHandler)
                // OAuth2 로그인 실패시 호출할 handler
                .failureHandler(authenticationFailureHandler);

        // JWT를 다룰 때 생길 excepion을 처리할 class를 지정
        http.exceptionHandling()
                // 인증 과정에서 생길 exception을 처리
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)	// 401
                // 인가 과정에서 생길 exception을 처리
                .accessDeniedHandler(jwtAccessDeniedHandler);		// 403

        // 모든 request에서 JWT를 검사할 filter를 추가
        // UsernamePasswordAuthenticationFilter에서 클라이언트가 요청한 리소스의 접근권한이 없을 때 막는 역할을 하기 때문에 이 필터 전에 jwtAuthenticationFilter를 실행
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}