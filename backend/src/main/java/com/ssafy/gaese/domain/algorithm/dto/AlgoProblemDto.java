package com.ssafy.gaese.domain.algorithm.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AlgoProblemDto {

    private String problemId;
    private int correct;
    private String ratio;
    private int submit;
    private String tag;
    private String title;

}
