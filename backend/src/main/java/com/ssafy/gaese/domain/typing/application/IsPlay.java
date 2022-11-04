package com.ssafy.gaese.domain.typing.application;

public interface IsPlay {

    public boolean isPlayCheck(String nickName);
    public void isPlaySet(String nickName);
    public boolean isPlayDel(String nickName);
}
