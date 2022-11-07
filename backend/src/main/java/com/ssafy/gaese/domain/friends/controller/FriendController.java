package com.ssafy.gaese.domain.friends.controller;

import com.ssafy.gaese.domain.friends.application.FriendService;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.dto.FriendRequestDto;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.security.model.CustomUserDetails;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="Friend", tags={"friend"})
@Slf4j
@RequestMapping("/friend")
@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final FriendSocketService friendSocketService;

    @GetMapping("/add")
    public ResponseEntity<?> addUser(@AuthenticationPrincipal CustomUserDetails userDetails,
                                     @RequestParam("friendId")Long friendId) throws NullPointerException{
        friendSocketService.saveFriend(userDetails.getId(),friendId);
        return ResponseEntity.ok("Friend added successfully");
    }

    @GetMapping("/list")
    public ResponseEntity<List<FriendDto>> getFriends(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FriendDto> myFriends = friendService.getFriends(userDetails.getId());
        return new ResponseEntity<List<FriendDto>>(myFriends, HttpStatus.OK);
    }

    @GetMapping("/request")
    public ResponseEntity<Boolean> requestFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                         @RequestParam("nickname")String nickname) {
        boolean isSuccess = friendService.requestFriend(userDetails.getId(),nickname);
        return ResponseEntity.ok().body(isSuccess);
        // 자기자신한테 요청을 보내면 450
    }

    @GetMapping("/request/list")
    public ResponseEntity<List<FriendRequestDto>> requestFriendList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FriendRequestDto> friendRequestDtoList = friendService.getRequestFriend(userDetails.getId());
        return ResponseEntity.ok().body(friendRequestDtoList);
    }
    @DeleteMapping("/request")
    public ResponseEntity<List<FriendRequestDto>> delRequestFriend(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                   @RequestParam("reqId")Long reqId) {
        List<FriendRequestDto> friendRequestDtoList = friendService.delRequest(userDetails.getId(),reqId);
        return ResponseEntity.ok().body(friendRequestDtoList);
    }

}