package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.cs.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(unique = true, nullable = false)
    private String socialId;


    @Column(nullable = true, unique = true)
    private String nickname;


    private String img;

    @Column(nullable = false)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String refreshToken;

    @ColumnDefault("0")
    private int profileChar;

    public User update(String nickname, int profileChar) {
        this.nickname = nickname;
        this.profileChar = profileChar;
        return this;
    }

    public User updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .nickname(this.nickname)
                .id(this.id)
                .profileChar(this.profileChar)
                .build();
    }

}
