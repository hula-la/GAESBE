package com.ssafy.gaese.domain.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class AbilityDto {
    private Long id;
    private Long userId;
    private int algorithmLv;
    private int csLv;
    private int typingLv;

    private int algorithmExp;
    private int csExp;
    private int typingExp;
}
