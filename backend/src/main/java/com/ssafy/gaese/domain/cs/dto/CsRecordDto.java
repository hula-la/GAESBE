package com.ssafy.gaese.domain.cs.dto;

import com.ssafy.gaese.domain.cs.entity.ProblemCategory;
import lombok.Builder;
import lombok.Data;
import org.joda.time.LocalDate;

import java.util.Date;

@Data
@Builder
public class CsRecordDto {

    private Long csRecordId;

    private String date;

    private String correctCnt;

    private int ranks;

}
