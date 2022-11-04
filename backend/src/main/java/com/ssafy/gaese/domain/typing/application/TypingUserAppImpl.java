package com.ssafy.gaese.domain.typing.application;

import com.ssafy.gaese.domain.typing.dto.TypingUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TypingUserAppImpl implements TypingUserApp{

    @Autowired
    StringRedisTemplate redisTemplate;

    final static String key ="TypingUser";



    //key+nickName, 변수명, 변수
    @Override
    public String getVar(String nickName, String varName)
    {
        HashOperations<String, String, String> HashOperations = redisTemplate.opsForHash();
        return HashOperations.get(key+nickName,varName);
    }
    @Override
    public void setVar(String nickName, String varName, String var)
    {
        HashOperations<String, String, String> HashOperations = redisTemplate.opsForHash();
        HashOperations.put(key+nickName,varName,var);
    }

    @Override
    public void setUser(TypingUser user) {
        HashOperations<String, String, String> HashOperations = redisTemplate.opsForHash();
        String tmpKey=key+user.getNickName();
        if(user.getId()!=null)
            HashOperations.put(tmpKey,"id",user.getId().toString());
        if(user.getNickName()!=null)
            HashOperations.put(tmpKey,"nickName",user.getNickName());
        if(user.getImgUrl()!=null)
            HashOperations.put(tmpKey,"imgUrl",user.getImgUrl());
        if(user.getSocketId()!=null)
            HashOperations.put(tmpKey,"socketId",user.getSocketId());
        if(user.getIsHead()!=null)
            HashOperations.put(tmpKey,"isHead",user.getIsHead().toString());
        if(user.getRank()!=null)
            HashOperations.put(tmpKey,"rank",user.getRank().toString());
        if(user.getProgress()!=null)
            HashOperations.put(tmpKey,"progress",user.getProgress().toString());
        if(user.getTypeSpeed()!=null)
            HashOperations.put(tmpKey,"typeSpeed",user.getTypeSpeed().toString());
        if(user.getErrors()!=null)
            HashOperations.put(tmpKey,"trues",user.getTrues().toString());
        if(user.getErrors()!=null)
            HashOperations.put(tmpKey,"errors",user.getErrors().toString());
    }
    @Override
    public TypingUser getWaitUser(String nickName)
    {
        HashOperations<String, String, String> HashOperations = redisTemplate.opsForHash();
        TypingUser tu = new TypingUser();

        tu.setNickName(nickName);
        tu.setImgUrl(HashOperations.get(key+nickName,"imgUrl"));
        tu.setSocketId(HashOperations.get(key+nickName,"socketId"));

        tu.setIsHead( Boolean.parseBoolean(HashOperations.get(key+nickName,"isHead")));

        return tu;
    }
    @Override
    public void userDel(String nickName)
    {
        HashOperations<String, String, String> HashOperations = redisTemplate.opsForHash();
        String tmpKey=key+nickName;

            HashOperations.delete(tmpKey,"id");
            HashOperations.delete(tmpKey,"nickName");
            HashOperations.delete(tmpKey,"imgUrl");
            HashOperations.delete(tmpKey,"socketId");
            HashOperations.delete(tmpKey,"isHead");
            HashOperations.delete(tmpKey,"rank");
            HashOperations.delete(tmpKey,"progress");
            HashOperations.delete(tmpKey,"typeSpeed");
            HashOperations.delete(tmpKey,"errors");
    }
}
