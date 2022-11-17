package com.ssafy.gaese.domain.ssafyGame.dto;

import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SsafyRecordDto {

    private Long ssafyRecordId;

    private boolean isCorrect;

    private int winningStreak;

    private int ranks;



    private String date;


}
