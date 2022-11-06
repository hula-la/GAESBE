package com.ssafy.gaese.domain.friends.controller;

import com.ssafy.gaese.domain.friends.application.FriendService;
import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value="Friend", tags={"friend"})
@Slf4j
@RequestMapping("/friend")
@RestController
public class FriendController {

    @Autowired
    FriendService friendService;

    @GetMapping("addFriend")
    public ResponseEntity<?> addUser(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @RequestParam("friendId")Long friendId) throws NullPointerException{
        friendService.saveFriend(userDetails.getId(),friendId);
        return ResponseEntity.ok("Friend added successfully");
    }

    @GetMapping("listFriends")
    public ResponseEntity<List<FriendDto>> getFriends(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FriendDto> myFriends = friendService.getFriends(userDetails.getId());
        return new ResponseEntity<List<FriendDto>>(myFriends, HttpStatus.OK);
    }

}