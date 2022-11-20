package com.ssafy.gaese.security.model.account;

import com.ssafy.gaese.domain.user.entity.AuthProvider;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }
    Map<String, Object> response = (Map<String, Object>) attributes.get("response");

    @Override
    public String getId() {
        return (String)response.get("id");
    }
    @Override
    public String getName() {
        return (String) response.get("name");
    }
//    @Override
//    public String getEmail() {
//        return (String) response.get("email");
//    }

    @Override
    public AuthProvider getAuthProvider() {
        return AuthProvider.NAVER;
    }
    @Override
    public String getImageUrl() {
        return (String) response.get("profile_image");
    }


}