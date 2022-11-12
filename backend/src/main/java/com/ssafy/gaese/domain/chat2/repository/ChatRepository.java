package com.ssafy.gaese.domain.chat2.repository;

import com.ssafy.gaese.domain.chat2.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Long> {

//    List<Chat> findAllByFromIdAndToIdOrToIdAndFromId(Long  from, Long to);

    @Query("SELECT c From Chat c  WHERE c.fromUser.id =:myId OR c.toUser.id=:friendId")
    List<Chat> findMyChat(@Param("myId") Long myId);

}
