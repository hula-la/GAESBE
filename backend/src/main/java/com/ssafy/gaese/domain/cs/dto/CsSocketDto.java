package com.ssafy.gaese.domain.cs.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CsSocketDto {
    public enum Type {
        ENTER, LEAVE
    }

    private Type type;
    private String sessionId;
    private Long userId;
    private String roomCode;
}
