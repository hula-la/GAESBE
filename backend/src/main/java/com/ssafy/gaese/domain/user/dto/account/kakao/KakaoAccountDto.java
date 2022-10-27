package com.ssafy.gaese.domain.user.dto.account.kakao;

import com.ssafy.gaese.domain.user.entity.User;
import lombok.Data;

import java.util.Properties;

@Data
public class KakaoAccountDto {

    /*
    @sierrah
    [Kakao] 현재 mument 에서의 동의 항목
    필수 - 닉네임 (profile_nickname)
    선택 - 카카오계정 이메일 (account_email)
    카카오 개발자 문서에 표기된 JSON 서식을 보고 만들었다.
    */

    public Long id; //회원번호, *Required*
    public String connected_at; //서비스에 연결된 시각, UTC*
    public Properties properties;
    public KakaoAccount kakao_account;

    @Data
    public class KakaoAccount {
        public Boolean profile_nickname_needs_agreement;
        public Boolean email_needs_agreement;
        public Boolean is_email_valid;
        public Boolean is_email_verified;
        public Boolean has_email;

        public String email;
        public KakaoProfile profile;

        @Data
        public class KakaoProfile {
            public String nickname;
            public String profile_image_url;
        }
    }


    public User of(){
        return User.builder()
                .socialId(this.getId())
                .email(this.getKakao_account().getEmail())
                .nickname(this.getKakao_account().getProfile().getNickname())
                .build();
    }
}