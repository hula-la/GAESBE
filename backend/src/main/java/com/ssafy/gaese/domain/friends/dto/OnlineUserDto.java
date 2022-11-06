package com.ssafy.gaese.domain.friends.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@ToString
@RedisHash("OnlineUser")
public class OnlineUserDto {
    @Id
    private Long id;
    private String sessionId;
    private String nickname;
    private int profileChar;
}
