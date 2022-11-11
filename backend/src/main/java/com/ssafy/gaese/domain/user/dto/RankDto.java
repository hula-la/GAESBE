package com.ssafy.gaese.domain.user.dto;


import lombok.*;

import java.util.List;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RankDto {
    private Long id;
    private String nickname;

    private Long myAlgoRank;
    private Long myCsRank;
    private Long myTypingRank;
    private Long myLuckRank;

    private List<LvExpDto> algo;
    private List<LvExpDto> cs;
    private List<LvExpDto> typing;
    private List<LvExpDto> luck;






}
