package com.ssafy.gaese.domain.chat.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatSocketDto {

    private String sessionId;
    private Long myId;
    private Long friendId;

}