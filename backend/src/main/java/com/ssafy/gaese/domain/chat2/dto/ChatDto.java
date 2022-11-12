package com.ssafy.gaese.domain.chat2.dto;

import com.ssafy.gaese.domain.chat2.entity.Chat;
import lombok.*;
import java.util.Date;

@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {

    private Long id;
    private Long from;
    private Long to;
    private String msg;
    private Date date;
    private boolean checked;


    public void setDate(){
        this.date = new Date();
    }

}
