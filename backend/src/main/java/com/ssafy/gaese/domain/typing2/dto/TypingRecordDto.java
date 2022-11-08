package com.ssafy.gaese.domain.typing2.dto;

import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TypingRecordDto {

    private Long typingRecordId;

    private int typeSpeed;

    private int ranks;

    private TypingRecord.LangType langType;

}
