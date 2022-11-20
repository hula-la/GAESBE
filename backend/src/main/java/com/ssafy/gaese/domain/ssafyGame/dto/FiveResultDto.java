package com.ssafy.gaese.domain.ssafyGame.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiveResultDto {

    private List<NickMaxWinSteakDto> list;

    private int myWinMaxWinStreak;

    private int myWinningStreak;

}
