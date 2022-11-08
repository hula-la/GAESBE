package com.ssafy.gaese.domain.typing.dto;


import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@RedisHash("TypingUser")
public class TypingUser {


    @Id
    String nickName;


    Long id;

    String imgUrl;
    String socketId;

    //true,false
    Boolean isHead=false;

    Integer rank=0;
    Integer progress=0;
    Integer typeSpeed=0;
    Integer trues=0;
    Integer errors=0;
}
