package com.ssafy.gaese.domain.algorithm.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class AlgoUserDto {
    private Long id;
    private String nickname;
    private int profileChar;
    private String bjId;
}
