package com.ssafy.gaese.domain.chat.repository;

import com.ssafy.gaese.domain.chat.entity.ChatUser;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ChatUserRepository extends JpaRepository<ChatUser,Long> {
    Optional<ChatUser> findByFromUserAndToUser(User from, User to);

    @Transactional
    @Modifying
    @Query("UPDATE ChatUser u SET u.open=:open WHERE u.fromUser=:fromUserId")
    void updateOpen(@Param("fromUserId") Long fromUserId, @Param("open") boolean open);

    @Transactional
    @Modifying
    @Query("UPDATE ChatUser u SET u.open=:wait WHERE u.fromUser=:open")
    void updateWait(@Param("fromUserId") Long fromUserId, @Param("open") User open);

}
