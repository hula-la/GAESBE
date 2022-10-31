## Spring Security, JWT, OAuth

### Spring Security

- '인증'과 '권한'에 대한 부분을 Filter 흐름에 따라 처리
- Servlet Container는 요청 URI의 경로에 따라 어떤 Filter와 어떤 Servlet을 적용할 것인지 결정
- **필터**는 요청이 서블릿에게 전달되기 전 요청을 검증하고 데이터를 추가/변조하는 역할을 함.
- 필터는 mvc 패턴 이전에 요청을 먼저 처리하기 위해 톰캣(WAS) 에서 지원하는 기능
- 스프링 

### OAuth

1. Resource Owner
   - User, 즉 사용자
   - 이미 google, facebook 등에 가입된 유저로 Resource Server의 Resource Owner
2. Resource Server
   - 자원을 호스팅하는 서버
   - google, facebook, Nave 등 Oauth 제공자
3. Client
   - 리소스 서버에서 제공하는 자원을 사용하는 애플리케이션
   - Naver band, Notion 등
4. Authorization Server
   - 사용자 동의를 받아서 권한을 부여 및 관리하는 서버

![img](https://blog.kakaocdn.net/dn/UlyKi/btrtjPpZgRo/6nCEitTqc0FE8kfu48glJ0/img.png)

---

### Spring Security 필터들

#### UsernamePasswordAuthenticationFilter의 인증 과정

![img](https://blog.kakaocdn.net/dn/0GxAW/btrtXyWxOkk/DVzjskyurG78ZO9asY9Nl0/img.png)

- AuthenticationManager는 일반적으로 ProviderManager로 구현되며, ProviderManager는 여러 AuthenticationProvider에 인증을 위임.
- 여러 AuthenticationProvider 중 하나라도 인증에 성공한다면 ProviderManager에게 인증된 Authentication 객체를 반환하고, 이는 event 기반으로 AuthenticationFilter에 전송됨.
- ProviderManager에 설정된 AuthenticationProvider 중 어느 것도 성공적으로 인증을 수행할 수 없다면, 인증 실패. 알맞는 예외가 ProviderManager에게 건내질 것

---

### Auth+JWT 방식의 요청 흐름

- JWT를 사용하는 경우 SecurityConfig 파일에서 아래 설정을 해줌.

  ```java
  .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
  ```

  > `SessionCreationPolicy.STATELESS` 설정으로 인해 세션 존재 여부를 떠나서 세션을 통한 인증 메커니즘 방식을 취하지 않음. 
  >
  > 이 때문에, 인증에 성공한 이후라도 클라이언트가 다시 어떤 자원에 접근을 시도할 경우 SecurityContextPersistenceFilter는 세션 존재 여부를 무시하고 항상 새로운 SecurityContext 객체를 생성하기 때문에 인증성공 당시 SecurityContext에 저장했던 Authentication 객체를 더 이상 참고 할 수 없게 됨.
  >
  > 그렇기 때문에 매번 인증을 받아야 하고 인증을 필요로 하는 상태가 됨.
  >
  > 즉 세션 방식의 인증 처리가 되지 않음.

  로그인을 마쳐도 Context가 저장되지 않기 때문에 SecurityContextPersistanceFilter에서는 매번 새로운 객체를 생성하고 새로 인증하게 됨.

## 참고

https://cme10575.tistory.com/165

**[더 자세함]**https://velog.io/@tmdgh0221/Spring-Security-%EC%99%80-OAuth-2.0-%EC%99%80-JWT-%EC%9D%98-%EC%BD%9C%EB%9D%BC%EB%B3%B4#oauth2-%EC%9D%B8%EC%A6%9D-%EA%B3%BC%EC%A0%95