package com.ssafy.gaese.domain.typing.common;


import com.ssafy.gaese.domain.typing.dto.TypingUser;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypingUserData implements Comparable<TypingUserData>{

    String nickName;
    String imgUrl;

    //순위
    int rank;
    //진행률?
    int progress;
    //정타수/초 * 60 소수점 다버림
    int typingSpeed;
    //오타 갯수
    volatile int errors;
    //정타 갯수
    volatile int tCount;

    boolean isHead;

    //나중에 더 추가할게 없다면 필요없음 삭제해야함
    public void setUserToDB(TypingUser user)
    {
        imgUrl = user.getImgUrl();
    }

    public void setTypingSpeed(int startTime, int nowTime)
    {
        int time = startTime-nowTime;
        if(time<0)
        {
            time+=3600;
        }
        typingSpeed =(tCount*60)/time;
    }

    @Override
    public int compareTo(TypingUserData o) {
        return o.progress - this.progress;
    }
}
