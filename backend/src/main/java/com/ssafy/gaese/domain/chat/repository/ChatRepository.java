package com.ssafy.gaese.domain.chat.repository;

import com.ssafy.gaese.domain.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Long> {

//    List<Chat> findAllByFromIdAndToIdOrToIdAndFromId(Long  from, Long to);

    @Query("SELECT c From Chat c  WHERE c.fromUser.id =:myId OR c.toUser.id=:myId order by c.date desc ")
    List<Chat> findMyChat(@Param("myId") Long myId);


    //DELETE From gaese.chat WHERE (from_user_id =7 and to_user_id=5) or (from_user_id =5 and to_user_id=7)
    @Transactional
    @Modifying
    @Query(value ="DELETE From gaese.chat WHERE (from_user_id =:myId and to_user_id=:friendId) or (from_user_id =:friendId and to_user_id=:myId)"
            , nativeQuery = true)
    void delMyChat(@Param("myId") Long myId, @Param("friendId") Long friendId);




}
