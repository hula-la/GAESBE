package com.ssafy.gaese.domain.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class AttendanceDto {
    private Long id;
    private String date;

}
