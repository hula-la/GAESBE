package com.ssafy.gaese.domain.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Data
@Builder
@ToString
public class UserDto {
    private Long id;
    private String nickname;
    private int profileChar;
}
