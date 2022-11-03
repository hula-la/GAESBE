package com.ssafy.gaese.domain.algorithm.dto;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

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
