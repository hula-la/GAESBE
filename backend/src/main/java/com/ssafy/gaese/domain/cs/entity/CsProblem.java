package com.ssafy.gaese.domain.cs.entity;

import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CsProblem")
public class CsProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;


    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private ProblemType type;

    @Column(nullable = false)
    private String example;

    private String img;

    @Column(nullable = false)
    private String answer;


    @OneToMany(mappedBy = "problem", cascade = CascadeType.REMOVE)
    private List<CsWrongProblem> csWrongProblemList = new ArrayList<>();
}
