package com.ssafy.gaese.domain.chat.dto;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash( value = "chat")
public class MessageDto {

    @Id
    private String fromUser;
    private String toUser;
    private String msg;
    private Date date;
    private boolean read;

}
