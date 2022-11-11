package com.ssafy.gaese.domain.chat.entity;


import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ChatUser")
public class ChatUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "toUserId", referencedColumnName = "id")
    User toUser;

    @ManyToOne
    @JoinColumn(name = "fromUserId", referencedColumnName = "id")
    User fromUser;
    private boolean open;
    private boolean wait;


}
