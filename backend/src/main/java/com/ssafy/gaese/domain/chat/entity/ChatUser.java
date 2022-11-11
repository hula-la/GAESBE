package com.ssafy.gaese.domain.chat.entity;


import com.ssafy.gaese.domain.chat.dto.ChatUserDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ChatUser")
public class ChatUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "myId")
    User me;

    @ManyToOne
    @JoinColumn(name = "friendId")
    User friend;

    private boolean open;
    private boolean wait;

    public ChatUserDto toDto(){
        return ChatUserDto.builder()
                .open(this.open)
                .friendId(this.friend.getId())
                .wait(this.wait)
                .myId(this.me.getId()).build();
    }


}
