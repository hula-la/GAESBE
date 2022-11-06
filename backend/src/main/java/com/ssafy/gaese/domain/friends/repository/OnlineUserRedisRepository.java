package com.ssafy.gaese.domain.friends.repository;

import com.ssafy.gaese.domain.friends.dto.OnlineUserDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface OnlineUserRedisRepository extends CrudRepository<OnlineUserDto,Long> {

}