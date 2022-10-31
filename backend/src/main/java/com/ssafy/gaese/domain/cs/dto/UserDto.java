package com.ssafy.gaese.domain.cs.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class UserDto {
    private Long id;
    private String nickname;
    private int profileChar;
}
