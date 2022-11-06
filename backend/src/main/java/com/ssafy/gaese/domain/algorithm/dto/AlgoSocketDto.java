package com.ssafy.gaese.domain.algorithm.dto;


import lombok.*;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlgoSocketDto {
    public enum Type {
        ENTER, LEAVE
    }

    private Type type;
    private String sessionId;
    private String userId;
    private String roomCode;
}
