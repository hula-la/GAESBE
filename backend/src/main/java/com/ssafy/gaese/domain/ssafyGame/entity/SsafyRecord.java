package com.ssafy.gaese.domain.ssafyGame.entity;


import com.ssafy.gaese.domain.ssafyGame.dto.SsafyRecordDto;
import com.ssafy.gaese.domain.typing2.dto.TypingRecordDto;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@Table(name = "SsafyRecord")
@NoArgsConstructor
@AllArgsConstructor
public class SsafyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    private String date;

    private boolean isCorrect;

    private int winningStreak;

    public SsafyRecordDto toDto(){
        return SsafyRecordDto.builder()
                .ssafyRecordId(this.id)
                .isCorrect(this.isCorrect)
                .winningStreak(this.winningStreak)
                .date(this.date)
                .build();
    }

}
