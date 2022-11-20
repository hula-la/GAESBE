package com.ssafy.gaese.domain.user.dto.item;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class OfficeDto {
    private Long OfficeId;
    private String name;
    private Long minLv;
    private boolean own;

}
