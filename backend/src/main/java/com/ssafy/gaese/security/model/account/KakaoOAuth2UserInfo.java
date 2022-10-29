package com.ssafy.gaese.security.model.account;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
    Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

    @Override
    public String getId() {
        return "kakao";
    }
    @Override
    public String getName() {
        return (String) kakaoProfile.get("nickname");
    }
    @Override
    public String getEmail() {
        return "email";
    }
//    @Override
//    public String getEmail() {
//        return (String) kakaoAccount.get("email");
//    }
    @Override
    public String getImageUrl() {
        return (String) kakaoProfile.get("profile_image_url");
    }
}