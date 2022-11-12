package com.ssafy.gaese.domain.chat2.dto;

import com.ssafy.gaese.domain.chat.entity.Chat;
import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatPostDto {

    private List<Long> msgIds;


}
