package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.AuthProvider;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findBySocialIdAndAuthProvider(String socialId, AuthProvider authProvider);
    Optional<User> findByNickname(String nickname);

    @Query("SELECT u.nickname FROM User u WHERE u.id=:id")
    String getNickNameById(@Param("id") Long id);

    @Query("SELECT u.refreshToken FROM User u WHERE u.id=:id")
    String getRefreshTokenById(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.refreshToken=:token WHERE u.id=:id")
    void updateRefreshToken(@Param("id") Long id, @Param("token") String token);
}
