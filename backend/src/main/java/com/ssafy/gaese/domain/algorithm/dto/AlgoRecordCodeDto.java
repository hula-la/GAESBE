package com.ssafy.gaese.domain.algorithm.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlgoRecordCodeDto {
    Long userId;
    String code;
    String lan;
}
