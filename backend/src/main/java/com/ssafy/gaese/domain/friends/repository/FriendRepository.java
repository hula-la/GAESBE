package com.ssafy.gaese.domain.friends.repository;

import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friends,Integer> {

    boolean existsByFirstUserAndSecondUser(User first, User second);

    List<Friends> findByFirstUser(User user);
    Friends findByFirstUserAndSecondUser(User first, User second);
    List<Friends> findBySecondUser(User user);

}