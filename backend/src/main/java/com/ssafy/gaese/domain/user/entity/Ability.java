package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.user.dto.AbilityDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Ability")
public class Ability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "ability")
    private User user;

    @ColumnDefault("0")
    private int algorithmLv;
    @ColumnDefault("0")
    private int csLv;
    @ColumnDefault("0")
    private int typingLv;

    @ColumnDefault("0")
    private int algorithmExp;
    @ColumnDefault("0")
    private int csExp;
    @ColumnDefault("0")
    private int typingExp;

    public void levelUp(String field){
        switch (field){
            case "algorithm":
                this.algorithmLv++;
                break;
            case "cs":
                this.csLv++;
                break;
            case "typing":
                this.typingLv++;
                break;
            default:
                throw new RuntimeException();
        }
    }

    public void addExp(String field, int plus){
        switch (field){
            case "algorithm":
                this.algorithmExp+=plus;
                break;
            case "cs":
                this.csExp+=plus;
                break;
            case "typing":
                this.typingExp+=plus;
                break;
            default:
                throw new RuntimeException();
        }
    }

    public AbilityDto toDto(){
        return AbilityDto.builder()
                .algorithmExp(this.algorithmExp)
                .csExp(this.csExp)
                .typingExp(this.typingExp)
                .algorithmLv(this.algorithmLv)
                .csLv(this.csLv)
                .typingLv(this.typingLv)
                .userId(this.user.getId())
                .id(this.id)
                .build();
    }

}
