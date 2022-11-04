package com.ssafy.gaese.domain.typing.application;

import com.ssafy.gaese.domain.typing.dto.TypingRoom;
import com.ssafy.gaese.domain.typing.dto.TypingUser;

import java.util.List;

public interface TypingRoomApp {


    public List<String> getUserList(String roomNo);
    public String getVar(String roomNo, String varName);

    public void setVar(String roomNo, String varName, String var);

    public void makeRoom(TypingRoom room) ;
    public void delRoom(TypingRoom room);
    public String getRoomCodeToRoomNo(String roomCode);

    public void setRoomCodeToRoomNo(String roomCode, String roomNo);
    public void delRoomCodeToRoomNo(String roomCode);
    public String getRoomNoToNickName(String nickName);

    public void setNickNameToRoomNo(String nickName, String roomNo);

    public void dleNickNameToRoomNo(String nickName);
    //key, userListRoomNo, List
    public boolean enterUser(TypingUser user, String roomCode);
    public boolean exitUser(TypingUser user);

    public Long removeRandRoom(String roomNo);
    //pre+key, Set<String> , int
    //랜덤룸에 들어가고 인원 수 증가까지 제어 후 roomNo return
    public String randRoomEnter(String socketId);

}
