package com.ssafy.gaese.domain.typing2.entity;

import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@Table(name = "TypingParagraph")
@NoArgsConstructor
@AllArgsConstructor
public class TypingParagraph {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String content;


    private TypingRecord.LangType langType;


}


