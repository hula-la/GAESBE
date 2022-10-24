package com.ssafy.gaese.domain.user.dto;


import com.ssafy.gaese.domain.user.entity.LoginType;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String email;
    private String socialId;
    private String nickname;
    private String imgUrl;
    private String loginType;
    private MultipartFile file;


    public User toEntity(LoginType loginType){

        return User.builder()
                .email(this.getEmail())
                .socialId(this.getSocialId())
                .imgUrl(this.getImgUrl())
                .nickname(this.getNickname())
                .loginType(loginType)
                .build();
    }
}
