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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CsWrongProblem")
public class CsWrongProblem {
    @EmbeddedId
    private CsWrongId id;


    @DateTimeFormat(pattern = "yyyy-MM-DD")
    @Column(nullable = false)
    private Date date;

    private String selectedAns;


}
