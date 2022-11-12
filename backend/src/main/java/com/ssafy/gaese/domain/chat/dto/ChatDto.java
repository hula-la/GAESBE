package com.ssafy.gaese.domain.chat.dto;

import com.ssafy.gaese.domain.chat.entity.Chat;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;
import java.util.Date;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {

    private Long id;
    private Long from;
    private Long to;
    private String msg;
    private Date date;
    private boolean checked;

    public Chat newChat(User fromUser, User toUser){
        return Chat.builder()
                .id(this.id)
                .fromUser(fromUser)
                .toUser(toUser)
                .msg(this.msg)
                .date(new Date())
                .checked(false)
                .build();
    }



}
