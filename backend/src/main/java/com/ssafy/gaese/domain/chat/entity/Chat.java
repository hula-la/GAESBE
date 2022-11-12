package com.ssafy.gaese.domain.chat.entity;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fromUserId")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "toUserId")
    private User toUser;

    @Column(nullable = false)
    private String msg;
    @Column(nullable = false)
    private Date date;

    // 메시지를 확인했는지 유무
    @Column(nullable = false)
    private Boolean checked;

    public ChatDto toDto(){
        return ChatDto.builder()
                .id(this.id)
                .to(this.toUser.getId())
                .from(this.fromUser.getId())
                .msg(this.msg)
                .date(this.date)
                .checked(this.checked)
                .build();
    }

    public void checkMsg(){
        this.checked = true;
    }

}
