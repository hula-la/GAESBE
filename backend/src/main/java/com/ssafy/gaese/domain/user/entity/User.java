package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsWrongProblem;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

//    private String githubUrl;

    private String refreshToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CsWrongProblem> csWrongProblemList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CsRecord> csRecordList = new ArrayList<>();


    public User update(String nickname, String imgUrl) {
        this.nickname = nickname;
        this.img = imgUrl;
        return this;
    }

    public User updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

//    public UserDto toDto() {
//        return UserDto.builder()
//                .email(this.email)
//                .nickname(this.nickname)
//                .img(this.img)
//                .loginType(this.authProvider.name())
//                .build();
//    }

}
