package com.ssafy.gaese.domain.algorithm.entity;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "AlgoRecord")
public class AlgoRecord {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Long problemId;

    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Boolean isSolve;

    @Column(nullable = false, length = 50)
    private String solveTime;

    @Column(nullable = false)
    private Integer ranking;

    private Boolean isRetry;

    @Column(columnDefinition = "TEXT")
    private String code;

    public AlgoRecordDto toDto(){
        return AlgoRecordDto.builder()
                .date(this.date)
                .id(this.id)
                .isRetry(this.isRetry)
                .isSolve(this.isSolve)
                .problemId(this.problemId)
                .ranking(this.ranking)
                .solveTime(this.solveTime)
                .userId(this.user.getId())
                .build();
    }

}
