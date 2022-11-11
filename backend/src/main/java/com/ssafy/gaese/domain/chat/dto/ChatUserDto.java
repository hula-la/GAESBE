package com.ssafy.gaese.domain.chat.dto;


import com.ssafy.gaese.domain.chat.entity.ChatUser;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatUserDto {

    Long myId;
    Long friendId;
    boolean open;
    boolean wait;

    public ChatUser toEntity (User me, User friend){
        return ChatUser.builder()
                .friend(friend)
                .me(me)
                .open(this.open)
                .wait(this.wait)
                .build();
    }

}
