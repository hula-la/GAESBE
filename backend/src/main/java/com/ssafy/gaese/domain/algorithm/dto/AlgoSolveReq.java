package com.ssafy.gaese.domain.algorithm.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlgoSolveReq {
    int problemId;
    String userBjId;
    int lanId;
}
