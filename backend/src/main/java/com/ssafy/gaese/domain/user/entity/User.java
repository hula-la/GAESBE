package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.algorithm.dto.AlgoUserDto;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.user.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    private String bjId;

    @Column(nullable = false)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String refreshToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CsRecord> csRecordList = new ArrayList<>();


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
    public AlgoUserDto toAlgoDto(){
        return AlgoUserDto.builder()
                .id(this.id)
                .bjId(this.bjId)
                .nickname(this.nickname)
                .profileChar(this.profileChar)
                .build();
    }

}
