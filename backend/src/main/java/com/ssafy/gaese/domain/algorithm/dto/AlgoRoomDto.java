package com.ssafy.gaese.domain.algorithm.dto;


import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Getter
@ToString
public class AlgoRoomDto {
    public enum Type {
        ENTER, LEAVE
    }

    private Type type;
    @Id
    private String roomNo;
    private String username;
}
