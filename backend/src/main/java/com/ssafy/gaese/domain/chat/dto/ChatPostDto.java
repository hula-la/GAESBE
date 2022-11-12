package com.ssafy.gaese.domain.chat.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatPostDto {

    private List<Long> msgIds;


}
