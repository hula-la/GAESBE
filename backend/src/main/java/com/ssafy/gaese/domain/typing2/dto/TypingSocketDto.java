package com.ssafy.gaese.domain.typing2.dto;


import com.ssafy.gaese.domain.typing2.entity.TypingRecord;
import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class TypingSocketDto extends BaseSocketDto {

    public enum RoomType {
        RANDOM, FRIEND
    }


    private TypingRecord.LangType langType;
    private RoomType roomType;
}
