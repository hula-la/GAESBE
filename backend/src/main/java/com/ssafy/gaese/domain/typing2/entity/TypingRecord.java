package com.ssafy.gaese.domain.typing2.entity;

import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.cs.entity.CsProblem;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@Table(name = "TypingRecord")
@NoArgsConstructor
@AllArgsConstructor
public class TypingRecord {
    public enum LangType{
        PYTHON,JAVA
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String date;

    private int typeSpeed;

    private int ranks;
    private LangType langType;

    public TypingRecordDto toDto(){
        return TypingRecordDto.builder()
                .typingRecordId(this.id)
                .typeSpeed(this.typeSpeed)
                .ranks(this.ranks)
                .langType(this.langType)
                .build();
    }

}


