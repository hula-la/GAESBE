package com.ssafy.gaese.domain.typing2.dto;

import lombok.Data;

@Data
public class TypingSubmitDto {
    private String roomCode;
    private String sessionId;
    private Long userId;
    private boolean isCorrect;
}
