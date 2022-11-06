package com.ssafy.gaese.domain.friends.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class FriendDto {
    private Long id;
    private String nickname;
    private int profileChar;
}
