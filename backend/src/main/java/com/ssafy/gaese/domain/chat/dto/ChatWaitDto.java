package com.ssafy.gaese.domain.chat.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatWaitDto {
    Long friendId;
    boolean wait;
}
