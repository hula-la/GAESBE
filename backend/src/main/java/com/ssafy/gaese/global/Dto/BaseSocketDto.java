package com.ssafy.gaese.global.Dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BaseSocketDto {
    public enum Type {
        ENTER, LEAVE
    }

    private Type type;
    private String sessionId;
    private Long userId;
    private String roomCode;
    private String nickname;
}