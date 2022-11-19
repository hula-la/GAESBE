package com.ssafy.gaese.domain.friends.entity;

import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.dto.FriendRequestDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "FriendRequest")
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Date createdDate;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "requestUserId", referencedColumnName = "id")
    User requestUser;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "targetUserId", referencedColumnName = "id")
    User targetUser;

    public FriendRequestDto toDto(){
        return FriendRequestDto.builder()
                .friendReqId(this.id)
                .requestUser(requestUser.toFriendDto())
                .build();
    }

}
