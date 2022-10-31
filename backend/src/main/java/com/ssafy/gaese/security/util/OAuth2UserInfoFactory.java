package com.ssafy.gaese.security.util;

import com.ssafy.gaese.domain.user.entity.AuthProvider;
import com.ssafy.gaese.security.model.account.*;

import java.util.Map;

// provider에 따라 OAuth2UserInfo를 생성하는 factory
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String, Object> attributes) {
        switch (authProvider) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case GITHUB: return new GithubOAuth2UserInfo(attributes);
            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}