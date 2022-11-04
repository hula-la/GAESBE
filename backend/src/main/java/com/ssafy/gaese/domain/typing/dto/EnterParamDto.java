package com.ssafy.gaese.domain.typing.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EnterParamDto {
        Long id;
        String lang;
        String nickName;
        String socketId;
        String roomCode;
        boolean isCreat;

}
