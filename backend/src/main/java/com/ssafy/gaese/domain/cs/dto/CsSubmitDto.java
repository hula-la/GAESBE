package com.ssafy.gaese.domain.cs.dto;

import lombok.Data;

@Data
public class CsSubmitDto {
    private String roomCode;
    private String sessionId;
    private Long userId;
    private Long problemId;
    private int answer;
}
