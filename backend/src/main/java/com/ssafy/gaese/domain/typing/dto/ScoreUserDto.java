package com.ssafy.gaese.domain.typing.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScoreUserDto {


    String nickName;
    int rank;
    int progress;
    int typeSpeed;
    int errors;


}
