## AccessDeniedHandler

#### 검색하게 된 이유

- JwtAccessDeniedHandler가 권한이 없는 사용자가 접근하려고 ㅎㄹ 때 에러를 보내는 것으로 이해함.
- 에러를 처리하는 애니까 GlobalErrorHandler에 묶고 싶은데, AccessDeninedHandler 인터페이스를 받아서 좀 다른 개념인가 싶어서 찾아봄.

```java
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        //필요한 권한이 없이 접근하려 할때 403
        // 403 에러 send
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
```

#### 서칭 결과

- Spring Security를 적용해서 HTTP 요청에 대해 인증 및 인가를 적용할 경우 시큐리티 필터 체인에 의해 인증 여부나 인가 여부에 따라 요청이 수락되거나 거절됨.
- **필터 체인 특성상 이런 Spring Security에 의한 차단은 서블릿 필터 단계에 속하는 부분이기 때문에 `@ControllerAdvice`같은 예외 처리기로 처리할 수 없음.**
- JSON 응답을 커스텀 하려면 별도로 설정이 필요