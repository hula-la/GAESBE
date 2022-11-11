package com.ssafy.gaese.domain.chat.repository;

import com.ssafy.gaese.domain.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Long> {

    List<Chat> findAllByFromIdAndToId(Long  from, Long to);

}
