package com.ssafy.gaese.domain.user.entity.item;

import com.ssafy.gaese.domain.user.dto.item.OfficeDto;
import lombok.*;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Office")
public class Office {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long minLv;

    @OneToMany(mappedBy = "office", cascade = CascadeType.REMOVE)
    private List<UserOffice> userOfficeList;


    public OfficeDto toDto(boolean own){
        return OfficeDto.builder()
                .OfficeId(this.id)
                .name(this.name)
                .minLv(this.minLv)
                .own(own)
                .build();
    }

}
