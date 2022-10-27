package com.ssafy.gaese.domain.user.dto.account.kakao;

import lombok.Data;

@Data
public class KakaoTokenDto {

//    인가코드를 보내서 카카오에서 전달받는 토큰 dto

    private String access_token;
    private String token_type;
    private String refresh_token;
    private String id_token;
    private int expires_in;
    private int refresh_token_expires_in;
    private String scope;
}