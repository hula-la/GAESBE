package com.ssafy.gaese.domain.chat.entity;


import com.ssafy.gaese.domain.chat.dto.ChatDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long from;
    @Column(nullable = false)
    private Long to;
    @Column(nullable = false)
    private String msg;
    @Column(nullable = false)
    private Date date;

    public ChatDto toDto(){
        return ChatDto.builder()
                .to(this.to)
                .from(this.from)
                .msg(this.msg)
                .date(this.date)
                .build();
    }

}
