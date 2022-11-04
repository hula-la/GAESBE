package com.ssafy.gaese.domain.typing.application;

import com.ssafy.gaese.domain.typing.dto.TypingUser;

public interface TypingUserApp {

    public String getVar(String nickName, String varName);
    public void setVar(String nickName, String varName, String var);
    public void setUser(TypingUser user);
    public TypingUser getWaitUser(String nickName);
    public void userDel(String nickName);
}
