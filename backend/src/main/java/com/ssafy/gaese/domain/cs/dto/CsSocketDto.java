package com.ssafy.gaese.domain.cs.dto;


import com.ssafy.gaese.global.Dto.BaseSocketDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CsSocketDto extends BaseSocketDto {

    public enum RoomType {
        RANDOM, FRIEND
    }

    private RoomType roomType;
}
