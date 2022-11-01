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
@Table(name = "CsWrongProblem")
@NoArgsConstructor
@AllArgsConstructor
public class CsWrongProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "problem_id")
    private CsProblem problem;


    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date date;

    private String selectedAns;


}


