package com.ssafy.gaese.domain.algorithm.dto;


import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.user.entity.User;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Builder
@Getter
@ToString
public class AlgoRecordDto {

    private Long id;
    private Long userId;
    private Long problemId;
    private Date date;
    private Boolean isSolve;
    private String solveTime;
    private Integer ranking;
    private String code;
    private Boolean isRetry;

    public AlgoRecord toEntity(User user){
        return AlgoRecord.builder()
                .user(user)
                .problemId(this.getProblemId())
                .code(this.getCode())
                .date(this.getDate())
                .solveTime(this.getSolveTime())
                .isSolve(this.getIsSolve())
                .ranking(this.getRanking())
                .code(this.getCode())
                .isRetry(false)
                .build();
    }

}
