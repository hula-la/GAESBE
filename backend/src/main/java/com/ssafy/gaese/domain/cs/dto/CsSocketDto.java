package com.ssafy.gaese.domain.cs.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CsSocketDto {
    public enum Type {
        ENTER, LEAVE
    }

    public enum RoomType {
        RANDOM, FRIEND
    }

    private Type type;
    private String sessionId;
    private Long userId;
    private String roomCode;
    private RoomType roomType;
}
