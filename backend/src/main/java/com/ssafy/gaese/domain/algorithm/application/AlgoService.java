package com.ssafy.gaese.domain.algorithm.application;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRecordDto;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRepository;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlgoService {

    private final AlgoRepository algoRepository;
    private final UserRepository userRepository;

    public AlgoRecordDto createAlgoRecord(AlgoRecordDto algoRecordDto, String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->new UserNotFoundException());
        algoRepository.save(algoRecordDto.toEntity(user));
        return algoRecordDto;
    }

}
