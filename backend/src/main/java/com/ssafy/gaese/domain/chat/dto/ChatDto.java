package com.ssafy.gaese.domain.chat.dto;

import com.ssafy.gaese.domain.chat.entity.Chat;
import lombok.*;
import org.junit.Before;

import javax.persistence.Column;
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

    public Chat toEntity(){
        return Chat.builder()
                .toId(this.to)
                .fromId(this.from)
                .msg(this.msg)
                .date(this.date)
                .date(this.date)
                .build();
    }
    public void setDate(){
        this.date = new Date();
    }

}
