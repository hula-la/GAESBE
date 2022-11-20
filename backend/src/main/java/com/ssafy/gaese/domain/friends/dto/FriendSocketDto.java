package com.ssafy.gaese.domain.friends.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FriendSocketDto {
    private String sessionId;
    private Long userId;
}
