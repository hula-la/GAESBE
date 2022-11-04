package com.ssafy.gaese.domain.typing.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TypingUser {

    Long id;

    String nickName;
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
