package com.ssafy.gaese.domain.typing.repository;

import com.ssafy.gaese.domain.typing.dto.TypingRoom;
import com.ssafy.gaese.domain.typing.dto.TypingUser;
import org.springframework.data.repository.CrudRepository;

public interface TypingUserRepository extends CrudRepository<TypingUser,String> {

}
