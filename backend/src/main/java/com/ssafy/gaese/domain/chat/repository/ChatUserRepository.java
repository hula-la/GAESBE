package com.ssafy.gaese.domain.chat.repository;

import com.ssafy.gaese.domain.chat.entity.ChatUser;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatUserRepository extends JpaRepository<ChatUser,Long> {


    Optional<ChatUser> findByFriendAndMe(User friend, User me);

//    List<ChatUser> findByMeAndWait(User me, boolean wait);

    ChatUser findByMe_IdAndFriend_Id(Long myId, Long friendId);

    @Transactional
    @Modifying
    @Query("UPDATE ChatUser u SET u.open=:open WHERE u.me.id =:myId AND u.friend.id=:friendId")
    void updateOpen(@Param("myId") Long myId,@Param("friendId") Long friendId, @Param("open") boolean open);

    @Transactional
    @Modifying
    @Query("UPDATE ChatUser u SET u.wait=:wait WHERE u.friend.id =:friendId AND u.me.id=:myId")
    void updateWait(@Param("myId") Long myId, @Param("friendId") Long friendId, @Param("wait") boolean wait);


}
