package com.ssafy.gaese.domain.algorithm.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AlgoChatDto {
    public enum MessageType {
        ENTER, TALK
    }

    private MessageType type;
    private int roomNo;
    private String username;
    private String content;
}
