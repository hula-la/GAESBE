package com.ssafy.gaese.domain.typing.dto;


import lombok.*;

@Getter
//@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EnterParamDto {
        Long id;
        String lang;
        String nickName;
        String socketId;
        String roomCode;
        boolean isCreat;

}
