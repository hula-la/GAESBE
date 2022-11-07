package com.ssafy.gaese.domain.typing.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckParamDto {

    String nickName;
    String roomNo;
    boolean check;

}
