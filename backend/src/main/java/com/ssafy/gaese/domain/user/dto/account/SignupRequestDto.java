package com.ssafy.gaese.domain.user.dto.account;

import lombok.Data;

@Data
public class SignupRequestDto {

    public String nickname;
    public String imgUrl;
    public String accessToken;
}