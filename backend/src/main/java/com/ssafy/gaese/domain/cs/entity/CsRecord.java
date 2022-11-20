package com.ssafy.gaese.domain.cs.entity;

import com.ssafy.gaese.domain.cs.dto.CsRecordDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CsRecord")
public class CsRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String date;



    @OneToMany(mappedBy = "csRecord", cascade = CascadeType.REMOVE)
    private List<CsRecordProblem> csRecordProblemList = new ArrayList<>();


    private int ranks;

    public CsRecordDto toDto(){
        return CsRecordDto.builder()
                .csRecordId(this.id)
                .ranks(this.ranks)
                .date(this.date)
                .build();
    }


}
