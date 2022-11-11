package com.ssafy.gaese.domain.ssafyGame.dto;

import lombok.*;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FlipParamDto {

    //배팅 패턴
    private int patten;
    //배팅금액
    private Long point;

}
