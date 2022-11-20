package com.ssafy.gaese.security.model.account;

import com.ssafy.gaese.domain.user.entity.AuthProvider;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
    Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

    @Override
    public String getId() {
        return String.valueOf(attributes.get("id"));
    }
    @Override
    public String getName() {
        return (String) kakaoProfile.get("nickname");
    }
//    @Override
//    public String getEmail() {
//        return "email";
//    }
//    @Override
//    public String getEmail() {
//        return (String) kakaoAccount.get("email");
//    }

    @Override
    public AuthProvider getAuthProvider() {
        return AuthProvider.KAKAO;
    }
    @Override
    public String getImageUrl() {
        return (String) kakaoProfile.get("profile_image_url");
    }
}