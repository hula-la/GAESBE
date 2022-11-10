package com.ssafy.gaese.global.redis;

import com.ssafy.gaese.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SocketInfo {

    //권민용
    //SessionId 이름을 socketId 로 착각해서 계속 그렇게 말하고 변수 이름도 전부 그렇게 지어 버려서 나중에 리펙토링 할때
    //고치고 지금은 일단 config에서만 sessionId로 사용하고 내부에선 socketId 로 명명 합니다.
    //혼란을 드려서 죄송합니다.


    //Val = ',' 로 구분자를 둔 String 형태
    //순서 : {id},{roomCode},{gameType},{nickName}
    //nickName 은 개인적으로 필요해서 넣었습니다. set 넣으실때 null이 아닌 빈 문자열이나 더미값 넣어주세요.
    private final StringRedisTemplate redisTemplate;
    private final RedisUtil redisUtil;

    static final String key ="SocketInfo";
    static final String gamekey ="GameOnlinePlayer";

    public String geSocketInfo(String socketId)
    {

        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        return HashOperations.get(key,socketId);

    }

    public void setSocketInfo(String socketId,String id, String roomCode, String gameType, String nickName)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        StringBuilder sb = new StringBuilder();

        sb.append(id).append(',').append(roomCode).append(',').append(gameType).append(',').append(nickName);

        HashOperations.put(key,socketId,sb.toString());
    }

    public void setOnlinePlayer(Long userId)
    {
        redisUtil.addSetData(gamekey, String.valueOf(userId));

    }
    public boolean isPlayGame(Long userId)
    {
        System.out.println("게임 중인지 검사");
        System.out.println(userId);
        System.out.println(redisUtil.isExistSetData(gamekey, String.valueOf(userId)));
        return redisUtil.isExistSetData(gamekey, String.valueOf(userId));

    }
    public void stopPlayGame(Long userId)
    {
        redisUtil.removeSetData(gamekey, String.valueOf(userId));

    }

    public void delSocketInfo(String socketId)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        HashOperations.delete(key,socketId);


    }
}
