package com.ssafy.gaese.domain.cs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CsProblem")
public class CsProblem {
    public enum ProblemCategory {
        ALGORITHM, DB, OS,NET
    }

    public enum ProblemType {
        MULTICHOICE,OX
    }



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProblemCategory category;


    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProblemType type;

    @Column(nullable = false)
    private String example;

    private String img;

    @Column(nullable = false)
    private int answer;

    @JsonIgnore
    @OneToMany(mappedBy = "csRecord", cascade = CascadeType.REMOVE)
    private List<CsRecordProblem> csRecordProblemList;

}
