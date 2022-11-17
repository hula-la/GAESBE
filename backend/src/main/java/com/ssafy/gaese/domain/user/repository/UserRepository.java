package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.ssafyGame.dto.NickMaxWinSteakDto;
import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.AuthProvider;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    @Query("SELECT u FROM User u WHERE u.id in :ids")
    List<User> findUsersByIds(List<Long> ids);

    @Query("SELECT u.bjId FROM User u WHERE u.id=:id")
    Optional<String> getBjIdById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.bjId=:bjId WHERE u.id=:id")
    int updateBjId(@Param("id") Long id, @Param("bjId") String bjId);

    @Query(value = "SELECT max_win_streak, nickname FROM gaese.user ORDER BY max_win_streak desc LIMIT 5",nativeQuery = true)
    List<NickMaxWinSteakDto> getNickMaxWinSteakDtoDesc();

}
