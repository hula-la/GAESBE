package com.ssafy.gaese.domain.ssafyGame.dto;

import lombok.*;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FlipResultDto {

    //맞췃으면 true
    private boolean isCorrect;
    private int patten;

    //아마 변화한 값을 넣어줄듯함
    private Long point;

}
