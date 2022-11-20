package com.ssafy.gaese.domain.algorithm.dto;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class AlgoProblemDto {

    private String problemId;
    private int correct;
    private String ratio;
    private int submit;
    private String tag;
    private String title;

}
