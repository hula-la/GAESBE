package com.ssafy.gaese.domain.user.dto;

import lombok.*;

@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LvExpDto implements Comparable<LvExpDto>
{
    private Long userId;
    private String nickName;
    private int lv;
    private int exp;

    @Override
    public int compareTo(LvExpDto o) {
        return o.getLv()-this.getLv()==0?o.getExp()-this.getExp():o.getLv()-this.getLv();
    }
}
