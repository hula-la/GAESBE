package com.ssafy.gaese.domain.friends.dto;

import com.ssafy.gaese.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class FriendRequestDto {
    private Long friendReqId;
    private FriendDto requestUser;
}
