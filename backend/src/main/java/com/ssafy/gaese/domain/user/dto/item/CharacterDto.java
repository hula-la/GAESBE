package com.ssafy.gaese.domain.user.dto.item;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class CharacterDto {
    private Long characterId;
    private String need;
    private boolean own;

}
