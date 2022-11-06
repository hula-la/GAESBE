package com.ssafy.gaese.domain.friends.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class FriendRequestDto {
    private Long friendReqId;
    private Long requestUserId;
    private Long targetUserId;
}
