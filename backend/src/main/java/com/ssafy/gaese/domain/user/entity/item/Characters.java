package com.ssafy.gaese.domain.user.entity.item;

import com.ssafy.gaese.domain.user.dto.item.CharacterDto;
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
@Table(name = "Characters")
public class Characters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String need;

    @OneToMany(mappedBy = "characters", cascade = CascadeType.REMOVE)
    private List<UserCharacter> userCharacterList;

    public CharacterDto toDto(boolean own){
        return CharacterDto.builder()
                .characterId(this.id)
                .need(this.need)
                .own(own)
                .build();
    }

}
