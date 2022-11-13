package com.ssafy.gaese.domain.chat.dto;

import lombok.*;

import java.util.HashMap;
import java.util.List;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatGetDto {

    private HashMap<Long, List<ChatDto>> chatList;


}
