package com.ssafy.gaese.domain.cs.entity;

import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@Table(name = "CsRecordProblem")
@NoArgsConstructor
@AllArgsConstructor
public class CsRecordProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cs_record_id")
    private CsRecord csRecord;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cs_problem_id")
    private CsProblem csProblem;

    private boolean isCorrect;

}


