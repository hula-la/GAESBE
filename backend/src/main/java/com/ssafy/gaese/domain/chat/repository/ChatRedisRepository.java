package com.ssafy.gaese.domain.chat.repository;

import com.ssafy.gaese.domain.chat.dto.MessageDto;
import org.springframework.data.redis.core.mapping.RedisPersistentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRedisRepository extends CrudRepository<MessageDto,String> {

    @Override
    List<MessageDto> findAllById(Iterable from);
}
