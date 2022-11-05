package com.ssafy.gaese.domain.algorithm.dto.redis;


import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Data
@RedisHash(value = "problem" , timeToLive = 60*60*24)
public class AlgoProblemRedisDto {

    @Id
    private String roomCode;
    private List<AlgoProblemDto> problemDtoList;

}
