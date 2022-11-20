package com.ssafy.gaese.domain.algorithm.dto;


import lombok.Data;

@Data
public class AlgoRecordReq {
    private String roomCode;
    private Long problemId;
    private int ranking;
    private String code;
    private int lanId;
}
