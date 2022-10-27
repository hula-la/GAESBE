package com.ssafy.gaese.domain.user.dto.account;

import com.ssafy.gaese.domain.user.entity.User;
import lombok.Data;

@Data
public class LoginResponseDto {

    public boolean loginSuccess;
    public String nickname;
    public String imgUrl;
    public String accessToken;
}