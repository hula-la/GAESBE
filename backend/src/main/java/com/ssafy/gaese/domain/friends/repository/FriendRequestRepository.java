package com.ssafy.gaese.domain.friends.repository;

import com.ssafy.gaese.domain.friends.entity.FriendRequest;
import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest,Long> {

    boolean existsByRequestUserAndTargetUser(User first, User second);

    List<FriendRequest> findByRequestUser(User user);


}