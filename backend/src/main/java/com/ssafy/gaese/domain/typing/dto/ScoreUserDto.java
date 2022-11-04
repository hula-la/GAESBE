package com.ssafy.gaese.domain.typing.dto;


import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScoreUserDto {


    String nickName;
    int rank;
    int progress;
    int typeSpeed;
    int errors;


}
