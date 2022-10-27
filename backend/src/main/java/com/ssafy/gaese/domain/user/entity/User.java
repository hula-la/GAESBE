package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.user.dto.UserDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User", indexes = {
        @Index(name = "idx__email", columnList = "email")
})
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(nullable = false)
    private Long socialId;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private RoleType roleType;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 10)
//    private Gender gender;

//    @Column(nullable = false)
//    private String ageRange;

    @Column(length = 100)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LoginType loginType;

    private String refreshToken;

    public User update(String nickname, String imgUrl) {
        this.nickname = nickname;
        this.imgUrl = imgUrl;
        return this;
    }

    public User updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .email(this.email)
                .nickname(this.nickname)
                .imgUrl(this.imgUrl)
                .loginType(this.loginType.toString())
                .build();
    }

}
