package com.ssafy.gaese.domain.typing.application;

import com.ssafy.gaese.domain.typing.dto.TypingRoom;
import com.ssafy.gaese.domain.typing.dto.TypingUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TypingRoomAppImpl implements TypingRoomApp{

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    TypingUserApp typingUserApp;

    final static String key ="TypingRoom";


    @Override
    public String getVar(String roomNo, String varName)
    {
        HashOperations<String, String, String> HashOperations
                = redisTemplate.opsForHash();
        return HashOperations.get(key+roomNo,varName);
    }
    @Override
    public List<String> getUserList(String roomNo)
    {
        HashOperations<String, String, List<String>> SSLHashOperations
                = redisTemplate.opsForHash();
        return SSLHashOperations.get(key+roomNo,"users");
    }
    @Override
    public void setVar(String roomNo, String varName, String var)
    {

        HashOperations<String, String, String> HashOperations
                = redisTemplate.opsForHash();

        HashOperations.put(key+roomNo,varName,var);
    }
    @Override
    public void makeRoom(TypingRoom room) {
        HashOperations<String, String, List<String >> SSLHashOperations
                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String tmpKey = key+room.getRoomNo();

        SSSHashOperations.put(tmpKey,"content",room.getContent());
        SSSHashOperations.put(tmpKey,"lang",room.getLang());
        SSSHashOperations.put(tmpKey,"roomNo",room.getRoomNo());
        SSSHashOperations.put(tmpKey,"startTime",room.getStartTime().toString());
        SSSHashOperations.put(tmpKey,"content",room.getContent());

        List<String> users = SSLHashOperations.get(tmpKey,"users");
        if(users==null)
        {
            users = new ArrayList<>();
            SSLHashOperations.put(tmpKey,"users",users);
        }

        if(room.getRoomCode()==null)//랜덤매칭
        {

        }
        else
        {
            //룸코드 추가
            SSSHashOperations.put(tmpKey,"roomCode",room.getRoomCode());
            setRoomCodeToRoomNo(room.getRoomCode(),room.getRoomNo());
        }
    }
    @Override
    public void delRoom(TypingRoom room) {
        HashOperations<String, String, List<String >> SSLHashOperations
                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String tmpKey = key+room.getRoomNo();

        SSSHashOperations.delete(tmpKey,"content");
        SSSHashOperations.delete(tmpKey,"lang");
        SSSHashOperations.delete(tmpKey,"roomNo");
        SSSHashOperations.delete(tmpKey,"startTime");
        SSLHashOperations.delete(tmpKey,"users");
        SSSHashOperations.delete(tmpKey,"roomCode");


    }
    @Override
    public String getRoomCodeToRoomNo(String roomCode)
    {

        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        return HashOperations.get("TypingRoomCode",roomCode);

    }
    @Override

    public void setRoomCodeToRoomNo(String roomCode, String roomNo)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        HashOperations.put("TypingRoomCode",roomCode,roomNo);
    }
    @Override
    public void delRoomCodeToRoomNo(String roomCode)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        HashOperations.delete("TypingRoomCode",roomCode);
    }
    @Override
    public String getRoomNoToNickName(String nickName)
    {

        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        return HashOperations.get("TypingNickNameToRoomNo",nickName);

    }
    @Override
    public void setNickNameToRoomNo(String nickName, String roomNo)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        HashOperations.put("TypingNickNameToRoomNo",nickName,roomNo);
    }

    @Override
    public void dleNickNameToRoomNo(String nickName)
    {
        HashOperations<String, String, String> HashOperations =
                redisTemplate.opsForHash();

        HashOperations.delete("TypingNickNameToRoomNo",nickName);
    }

    //key, userListRoomNo,
    //true면 방장인 경우, flas면 입장인 경우
    @Override
    public boolean enterUser(TypingUser user, String roomCode)
    {
        HashOperations<String, String, List<String >> SSLHashOperations
                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String roomNo;
        String tmpKey;
        //랜덤방에 추가
        if(roomCode==null)
        {
            roomNo = randRoomEnter(user.getSocketId());

            //새로 방이 만들어진 경우
            if(roomNo.equals(user.getSocketId()))
            {
                typingUserApp.setVar(user.getNickName(),"isHead","true");
            }
        }
        else
        {
            roomNo = getRoomCodeToRoomNo(roomCode);
        }

        //user 리스트에 추가

        tmpKey = key+roomNo;
        List<String> users = SSLHashOperations.get(tmpKey,"users");
        users.add(user.getNickName());
        SSLHashOperations.put(tmpKey,"users",users);

        //어느방에 들어갔는지 매칭 저장
        setNickNameToRoomNo(user.getNickName(),roomNo);

        //방장인 경우
        if(users.size()==1)
        {
            return true;
        }
        return false;

        //딴곳에서 하는게 맞을듯?
//        typingUserApp.setUser(user);

    }
    //flase 면 방 까지 삭제 해야함
    @Override
    public boolean exitUser(TypingUser user)
    {
        HashOperations<String, String, List<String >> SSLHashOperations
                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations
                = redisTemplate.opsForZSet();
        String tmpKey;
        String roomNo;

        boolean answer = true;
        roomNo = getRoomNoToNickName(user.getNickName());
        tmpKey = key+roomNo;


        List<String> users = SSLHashOperations.get(tmpKey,"users");
        users.remove(user.getNickName());

        if(users.size()==0)//방 삭제 해야함
        {
            //없는거 삭제 요청 보낼 수도 있음
            delRoomCodeToRoomNo(roomNo);
            answer = false;
        }

        if(user.getIsHead())//방장 분배 해줘야함
        {
            String tmpNick= users.get(0);
            //방장 분배
            typingUserApp.setVar(tmpNick,"isHead","true");
        }

        //유저 삭제하고
        SSLHashOperations.put(tmpKey,"users",users);

        //roomNo 매칭 삭제
        dleNickNameToRoomNo(user.getNickName());

        //랜덤 매칭 방 숫자 줄이기
        zSetOperations.incrementScore(tmpKey,roomNo,-1);

        //users는 컨트롤러에서제거

        return answer;

    }
    @Override
    public Long removeRandRoom(String roomNo)
    {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String tmpKey = key+"Rand";

        return zSetOperations.remove(tmpKey,roomNo);

    }

    //pre+key, Set<String> , int
    //랜덤룸에 들어가고 인원 수 증가까지 제어 후 roomNo return
    @Override
    public String randRoomEnter(String socketId)
    {
        if(socketId==null)
            return socketId;


        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String tmpKey = key+"Rand";
        String answer;
        Set<String> scoreRange =zSetOperations.rangeByScore(tmpKey, 0, 3);
        if(scoreRange.size()>0)
        {
            answer = scoreRange.iterator().toString();
            //이렇게 하면 사람 적은 방 부터 들어가게됨
        }
        else//없으면 만듬
        {
            zSetOperations.addIfAbsent(tmpKey,socketId,0);
            answer = socketId;
        }

        zSetOperations.incrementScore(tmpKey,answer,1);

        return answer;
    }

}
