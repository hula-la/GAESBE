## 전체 과정

![img](https://velog.velcdn.com/images/codesusuzz/post/9d669b1d-3e77-4994-a8a3-78635bf0a032/image.png)

1. `인가 코드`가 나오면, 프론트는 이걸 일단 백으로 보낸다.
   (엔드포인트 `/login/kakao`)
2. 백에서는 인가 코드를 가지고 카카오 서버에서 `access token` 을 받아온다.
3. 백에서 `access token` 으로 카카오 서버에서 회원 정보를 조회한다.
4. 요청한 회원 정보가 백으로 들어온다.
5. 백은 이 회원이 DB상에 존재하는 회원인지를 판단하고, 존재하지 않는다면 회원 정보를 DB에 저장한다.
6. 로그인 '요청'에 대한 '응답' 헤더에 JWT을 담아 프론트에게 보낸다.
7. 이때 백에서 발행한 JWT 자체에도 만료 시간이 있고,
   프론트에서 새로고침을 하면 받아온 토큰이 사라지기 때문에
   `access token` (카카오 access token 아님) 과 `refresh token`을 분리하는 로직을 추가적으로 수행한다.
   8-1. 프론트가 백 DB에 접근할 수 있는 건 `access token` 이다.
   8-2. `access token`은 만료 주기가 짧으며, 만료나 새로고침이 일어날 때마다 refresh가 일어나 `access token`을 재설정한다 (`refresh token`) -> silent refresh 방식으로 로그인을 유지하는 것이 좋을 듯.
8. access token을 받아와서 DB에 접근한다.
   9-1. 로그인을 시도한 계정의 정보가 DB에 있으면 (= 이미 가입된 회원) 홈 화면으로 리디렉트 시키기
   9-2. 최초 로그인인 경우 홈 화면으로 리디렉트시킨 후, 별명과 프로필 사진 설명하는 모달창 띄우기
   -> 이때 프론트에서 헤더에 토큰을 넣어 api 엔드포인트로 보내면, 백이 데이터를 담아 응답하는 방식으로 통신한다.



## Spring Security 인증과정

![img](https://velog.velcdn.com/images%2Fjkijki12%2Fpost%2Fc85d836e-9eab-4102-9e00-4d6c40f160d0%2Fimage.png)

1. Http Request가 서버로 넘어온다.
2. 가장먼저 AuthenticationFilter가 요청을 낚아챈다.
3. AuthenticationFilter에서 Request의 Username, password를 이용하여 UsernamePasswordAuthenticationToken을 생성한다.
4. 토큰을 AuthenticationManager가 받는다.
5. AuthenticationManager는 토큰을 AuthenticationProvider에게 토큰을 넘겨준다.
6. AuthenticationProvider는 UserDetailsService로 토큰의 사용자 아이디(username)을 전달하여 DB에 존재하는지 확인한다. 이 때, UserDetailsService는 DB의 회원정보를 UserDetails 라는 객체로 반환한다.
7. AuthenticationProvider는 반환받은 UserDetails 객체와 실제 사용자의 입력정보를 비교한다.
8. 비교가 완료되면 사용자 정보를 가진 Authentication 객체를 SecurityContextHolder에 담은 이후 AuthenticationSuccessHandle를 실행한다.(실패시 AuthenticationFailureHandler를 실행한다.)

---

---

#### 코드 참고

https://velog.io/@codesusuzz/Spring-Boot-JWT-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%95%EB%B3%B5%EA%B8%B0-2-%EC%84%9C%EB%B9%84%EC%8A%A4%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC-%EA%B5%AC%ED%98%84

---

- 소셜(네이버, 카카오, 구글)마다 다른 정보 값들을 제공하기 위해, 분기처리를 한 코드 참고

[[Spring Boot\] OAuth2 + JWT + React 적용해보리기 (velog.io)](https://velog.io/@jkijki12/Spring-Boot-OAuth2-JWT-적용해보리기)

---

## Security Config

```java
@RequiredArgsConstructor
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/token/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtExceptionFilter(),
                        OAuth2LoginAuthenticationFilter.class)
                .oauth2Login().loginPage("/token/expired")
                .successHandler(successHandler)
                .userInfoEndpoint().userService(oAuth2UserService);

        http.addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class);
    }
}
```

- **oauth2Login** : oauth2Login 설정을 시작한다는 뜻이다.
- **loginPage** : login 페이지 url을 직접 설정해준다는 뜻이다.
- **successHandler** : 로그인 성공 시, handler를 설정해준다.
- **userInfoEndpoint** : oauth2 로그인 성공 후 설정을 시작한다는 말이다.
- **userService** : oAuth2UserService에서 처리하겠다는 말이다.

---

## Refresh Token

[참고] https://kukekyakya.tistory.com/entry/Spring-boot-access-token-refresh-token-%EB%B0%9C%EA%B8%89%EB%B0%9B%EA%B8%B0jwt

1. 로그인하면 액세스 토큰과 refresh 토큰을 발급 받는다. refresh 토큰은 DB에도 저장해둔다.

2. 요청을 보낼 때마다 헤더에 액세스 토큰을 담아서 보낸다.

3. 액세스 토큰이 만료되었으면, 액세스 토큰과 refresh 토큰을 함께 보내서 토큰 재발급을 요청한다.

4. 기간만 만료된 유효한 액세스 토큰이고, DB에 저장된 refresh 토큰과 같으면서 유효한 refresh 토큰이면, 1번 과정처럼 액세스 토큰과 refresh 토큰을 재발급 받는다.

5. 유효하지않은 refresh 토큰이라면, 재로그인 요청을 받는다.