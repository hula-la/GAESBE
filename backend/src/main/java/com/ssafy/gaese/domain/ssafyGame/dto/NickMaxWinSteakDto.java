package com.ssafy.gaese.domain.ssafyGame.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NickMaxWinSteakDto {

    String nickName;
    int max_win_streak;
}
