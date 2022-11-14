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
@Table(name = "Ability",
        indexes = {
                @Index(name = "idx_algo", columnList = "algorithmLv, algorithmExp"),
                @Index(name = "idx_cs", columnList = "csLv, csExp"),
                @Index(name = "idx_typing", columnList = "typingLv, typingExp"),
                @Index(name = "idx_luck", columnList = "luckLv, luckExp")
        }
)
public class Ability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @MapsId
    @OneToOne(cascade = {CascadeType.PERSIST ,CascadeType.MERGE})
    @JoinColumn(name = "userId")
    private User user;

    @ColumnDefault("1")
    private int algorithmLv;
    @ColumnDefault("1")
    private int csLv;
    @ColumnDefault("1")
    private int typingLv;

    @ColumnDefault("1")
    private int luckLv;

    @ColumnDefault("0")
    private int algorithmExp;
    @ColumnDefault("0")
    private int csExp;
    @ColumnDefault("0")
    private int typingExp;
    @ColumnDefault("0")
    private int luckExp;

    public Ability(User user) {
        this.user = user;
    }
    

    public void addExp(String field, int plus){
        switch (field){
            case "algorithm":
                this.algorithmExp+=plus;
                this.algorithmLv+=this.algorithmExp/7;
                this.algorithmExp%=7;
                break;
            case "cs":
                this.csExp+=plus;
                this.csLv+=this.csExp/7;
                this.csExp%=7;
                break;
            case "typing":
                this.typingExp+=plus;
                this.typingLv+=this.typingExp/7;
                this.typingExp%=7;
                break;
            case "luck":
                this.luckExp+=plus;
                this.luckLv+=this.luckExp/777;
                this.luckExp%=777;
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
                .luckLv(this.luckLv)
                .luckExp(this.luckExp)
                .userId(this.user.getId())
                .id(this.id)
                .build();
    }

}
