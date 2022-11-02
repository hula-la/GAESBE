package com.ssafy.gaese.domain.cs.dto;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@RedisHash
public class CsChatDto {
    public enum MessageType {
        ENTER, TALK
    }

    private MessageType type;
    private int roomNo;
    private String username;
    private String content;
}
