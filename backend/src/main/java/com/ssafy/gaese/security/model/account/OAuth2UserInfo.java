package com.ssafy.gaese.security.model.account;

import com.ssafy.gaese.domain.user.entity.AuthProvider;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract AuthProvider getAuthProvider();
    public abstract String getName();

//    public abstract String getEmail();

    public abstract String getImageUrl();
}