package com.ssafy.gaese.domain.typing2.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TypingSocketDto {
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
