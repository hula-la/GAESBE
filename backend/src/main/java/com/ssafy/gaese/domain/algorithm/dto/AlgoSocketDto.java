package com.ssafy.gaese.domain.algorithm.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
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
