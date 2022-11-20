package com.ssafy.gaese.security.model.account;

import com.ssafy.gaese.domain.user.entity.AuthProvider;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }
    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
//    @Override
//    public String getEmail() {
//        return (String) attributes.get("email");
//    }

    @Override
    public AuthProvider getAuthProvider() {
        return AuthProvider.GOOGLE;
    }
    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}