package com.ssafy.gaese.domain.typing.application;

import com.ssafy.gaese.domain.typing.dto.TypingRoom;
import com.ssafy.gaese.domain.typing.dto.TypingUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class TypingRoomAppImpl implements TypingRoomApp{

    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    TypingUserApp typingUserApp;

    @Autowired
    IsPlay isPlay;

    final static String key ="TypingRoom";


    @Override
    public String getVar(String roomNo, String varName)
    {
        HashOperations<String, String, String> HashOperations
                = redisTemplate.opsForHash();
        return HashOperations.get(key+roomNo,varName);
    }

    @Override
    //남은 유저가 없으면 false로 반환 방을 삭제해야 하는경우임
    public boolean removeUsers(String roomNo, String nickName)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();
        String[] userArr = SSSHashOperations.get(key+roomNo,"users").split(",");

        StringBuilder sb = new StringBuilder();

        for (String u : userArr)
        {
           if(u.equals(nickName))
           {

           }
           else
           {
               sb.append(u).append(",");

           }
        }
        if(sb.length()!=0)
        {

            sb.delete(sb.length()-1,sb.length());
            SSSHashOperations.put(key+roomNo,"users",sb.toString());
            return true;
        }
        return false;


    }
    @Override
    public void addUsers(String roomNo, String nickName)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();
        String users=SSSHashOperations.get(key+roomNo,"users");
       if(users==null)
           SSSHashOperations.put(key+roomNo,"users",nickName);
        else
            SSSHashOperations.put(key+roomNo,"users",users+","+nickName);
    }
//    @Override
//    public List<String> getUserList(String roomNo)
//    {
//        HashOperations<String, String, List<String>> SSLHashOperations
//                = redisTemplate.opsForHash();
//        return SSLHashOperations.get(key+roomNo,"users");
//    }
    @Override
    public void setVar(String roomNo, String varName, String var)
    {

        HashOperations<String, String, String> HashOperations
                = redisTemplate.opsForHash();

        HashOperations.put(key+roomNo,varName,var);
    }
    @Override
    public void makeRoom(TypingRoom room) {
//        HashOperations<String, String, List<String >> SSLHashOperations
//                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String tmpKey = key+room.getRoomNo();

        //나중에 db에서 끌고 오도록 만들어야함
        SSSHashOperations.put(tmpKey,"content","test \n   test2");
        SSSHashOperations.put(tmpKey,"lang",room.getLang());
        SSSHashOperations.put(tmpKey,"roomNo",room.getRoomNo());
//        SSSHashOperations.put(tmpKey,"startTime",room.getStartTime().toString());


//        List<String> users = new ArrayList<>();
//        SSLHashOperations.put(tmpKey,"users",users);

//        List<String> users = SSLHashOperations.get(tmpKey,"users");
//        if(users==null)
//        {
//            users = new ArrayList<>();
//            SSLHashOperations.put(tmpKey,"users",users);
//        }

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
    public void delRoom(String roomNo) {
//        HashOperations<String, String, List<String >> SSLHashOperations
//                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String tmpKey = key+roomNo;

        SSSHashOperations.delete(tmpKey,"content");
        SSSHashOperations.delete(tmpKey,"lang");
        SSSHashOperations.delete(tmpKey,"roomNo");
        SSSHashOperations.delete(tmpKey,"startTime");
        SSSHashOperations.delete(tmpKey,"users");
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
    public boolean enterUser(TypingUser user, String roomCode, String lang)
    {
//        HashOperations<String, String, List<String >> SSLHashOperations
//                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String roomNo;
        String tmpKey;
        //랜덤방에 추가
        if(roomCode==null)
        {
            roomNo = randRoomEnter(user.getSocketId(),lang);

            System.out.println("랜덤방에 추가 roomNo :");
            System.out.println(roomNo);
//            setNickNameToRoomNo(user.getNickName(), roomNo);
            //새로 방이 만들어진 경우
            if(roomNo.equals(user.getSocketId()))
            {
                TypingRoom room = new TypingRoom();
//                room.getLang());
//                SSSHashOperations.put(tmpKey,"roomNo",room.getRoomNo());
                room.setRoomNo(roomNo);
                room.setLang(lang);
                System.out.println("랜덤방 새로 생성되는 경우");
                System.out.println(roomNo);
                makeRoom(room);
                typingUserApp.setVar(user.getNickName(),"isHead","true");
            }
        }
        else
        {
            roomNo = getRoomCodeToRoomNo(roomCode);
        }

        //user 리스트에 추가

        tmpKey = key+roomNo;
        System.out.println("유저 리스트에 추가하기 전임");
        System.out.println("user.getNickName() : "+ user.getNickName());
        System.out.println("user.getNickName() : "+ user.getNickName());
        System.out.println("user.getNickName() : "+ user.getNickName());
        addUsers(roomNo,user.getNickName());

        //어느방에 들어갔는지 매칭 저장
        setNickNameToRoomNo(user.getNickName(),roomNo);

//        //방장인 경우
//        if(users.size()==1)
//        {
//            return true;
//        }
        return false;

        //딴곳에서 하는게 맞을듯?
//        typingUserApp.setUser(user);

    }
    //flase 면 방 까지 삭제 해야함
    @Override
    public boolean exitUser(String nickName)
    {
//        HashOperations<String, String, List<String >> SSLHashOperations
//                = redisTemplate.opsForHash();
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations
                = redisTemplate.opsForZSet();
        String tmpKey;
        String roomNo;

        boolean answer = true;
        roomNo = getRoomNoToNickName(nickName);
        tmpKey = key+roomNo;

        isPlay.isPlayDel(nickName);

//        List<String> users = SSLHashOperations.get(tmpKey,"users");
//        users.remove(nickName);

        //removeUsers 유저 삭제시 남는 유저가 없다면 false 를 반환함, 방을 삭제해야하는 경우임
        if(!removeUsers(roomNo,nickName))//방 삭제 해야함
        {
            //없는거 삭제 요청 보낼 수도 있음
            delRoomCodeToRoomNo(roomNo);
            delRoom(roomNo);
            removeRandRoom(roomNo);
            answer = false;
        }
        //삭제된 유저가 방장이면 방장 분배 해줘야함
        else if(Boolean.parseBoolean(typingUserApp.getVar(nickName,"isHead")))
        {
            String[] userArr = SSSHashOperations.get(key+roomNo,"users").split(",");
            String tmpNick= userArr[0];
            //방장 분배
            typingUserApp.setVar(tmpNick,"isHead","true");
        }


        //roomNo 매칭 삭제
        dleNickNameToRoomNo(nickName);

        //랜매인지 아닌지 판단 해서 해야함
//        String tmp getRoomCodeToRoomNo(roo)
//        sdfsdfewf
        //랜덤 매칭 방 숫자 줄이기
        String tmp =  getVar(roomNo,"roomCode");
        System.out.println(roomNo);
        System.out.println(" getVar(roomNo, roomCode) : " + tmp);
        if(tmp!=null)
        {
            zSetOperations.incrementScore(tmpKey,roomNo,-1);
        }
//        Double d =
        System.out.println("zSetOperations.incrementScore(tmpKey,roomNo,-1)");
        System.out.println("zSetOperations.incrementScore(tmpKey,roomNo,-1)");
        System.out.println("zSetOperations.incrementScore(tmpKey,roomNo,-1)");
//        System.out.println(d);
        //users는 컨트롤러에서제거

        return answer;

    }
    @Override
    public Long removeRandRoom(String roomNo)
    {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String lang = getVar(roomNo,"lang");
        String tmpKey = key+"Rand"+lang;

        return zSetOperations.remove(tmpKey,roomNo);

    }

    //pre+key, Set<String> , int
    //랜덤룸에 들어가고 인원 수 증가까지 제어 후 roomNo return
    @Override
    public String randRoomEnter(String socketId, String lang) {
        if (socketId == null)
            return socketId;


        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        String tmpKey = key + "Rand" + lang;
        String answer;
        Set<String> scoreRange = zSetOperations.rangeByScore(tmpKey, 0, 3);
        List<String> tmpList = new ArrayList<>(scoreRange);
        if (tmpList.size() > 0) {
            System.out.println("randRoomEnter");
            System.out.println("기존 랜덤 룸에 들어감");
            System.out.println("현재 인원수  : " + tmpList.size());
            answer = tmpList.get(0);
            System.out.println("answer : " + answer);
            //이렇게 하면 사람 적은 방 부터 들어가게됨
        } else//없으면 만듬
        {
            System.out.println("randRoomEnter");
            System.out.println("없어서 만듬");
            System.out.println("socketId : " + socketId);
            zSetOperations.addIfAbsent(tmpKey, socketId, 0);
            answer = socketId;
        }

            zSetOperations.incrementScore(tmpKey, answer, 1);
            System.out.println(zSetOperations.score(tmpKey, answer));
//        zSetOperations.score(tmpKey,answer);
            return answer;
        }


}
