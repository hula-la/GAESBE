package com.ssafy.gaese.domain.typing.service;

import com.ssafy.gaese.domain.typing.application.IsPlay;
import com.ssafy.gaese.domain.typing.common.TypingStaticData;
import com.ssafy.gaese.domain.typing.dto.*;
import com.ssafy.gaese.domain.typing.repository.TypingRoomRepository;
import com.ssafy.gaese.domain.typing.repository.TypingUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TypingRoomService {


    @Autowired
    StringRedisTemplate redisTemplate;

    @Autowired
    IsPlay isPlay;

    private final TypingRoomRepository typingRoomRepository;

    private final TypingUserRepository typingUserRepository;



    static final String redisKey = "TypingMatch";

    //nick을 넣어서 roomNo를 가져옴
    public String getRoomNoToNick(String nick)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "nick"+nick;

        return SSSHashOperations.get(redisKey,hashkey);

    }

    public void setRoomNoToNick(String nick,String roomNo)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "nick"+nick;

        SSSHashOperations.put(redisKey,hashkey,roomNo);
    }

    public void delRoomNoToNick(String nick)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "nick"+nick;

        SSSHashOperations.delete(redisKey,hashkey);
    }



    public String getRoomNoToRoomCode(String roomCode)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "roomCode"+roomCode;

        return SSSHashOperations.get(redisKey,hashkey);

    }

    public void setRoomNoToRoomCode(String roomCode,String roomNo)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "roomCode"+roomCode;

        SSSHashOperations.put(redisKey,hashkey,roomNo);
    }

    public void delRoomNoToRoomCode(String roomCode)
    {
        HashOperations<String, String, String> SSSHashOperations
                = redisTemplate.opsForHash();

        String hashkey = "roomCode"+roomCode;

        SSSHashOperations.delete(redisKey,hashkey);
    }





//    public String getRoomNoToRoomCode(String roomCode)  {
////        String roomNo = ((TypingRoom) typingRoomRepository.findById(roomCode)).getRoomNo();
//        //값이 있는가 없는가
//        if(typingRoomRepository.findById(roomCode).isPresent())
//        {
//            TypingRoom typingRoom = typingRoomRepository.findById(roomCode).orElseThrow(() -> new RuntimeException());
//            return typingRoom.getRoomNo();
//        }
//
//        return "";
//
//    }

    public void roomMaker(TypingRoom typingRoom)
    {
        //나중에 mysql에서 가져와야함
        typingRoom.setContent("test1  \n   tetsste \n dkdkd");
        //밖에서 넣어서 들어옴
//        String roomCode = TypingStaticData.roomCodeMaker();
//        typingRoom.setRoomCode(roomCode);

        typingRoomRepository.save(typingRoom);

    }
    //roomNo 반환함, 실패시 null 반환
    public String enterRoom(TypingUser user, String roomCode, String lang)
    {
        ArrayList<TypingRoom> roomAll= (ArrayList<TypingRoom>) typingRoomRepository.findAll();

        //친선전 참가
        if(!(roomCode==null || roomCode.equals("")))
        {
            //기존에 참가 가능한 방이 있는지 체크 하는 부분
            for (TypingRoom room: roomAll)
            {
                if(room.getUsers().size()<4 && room.getRoomCode().equals(roomCode))
                {
                    room.getUsers().add(user);
                    setRoomNoToRoomCode(roomCode,room.getRoomNo());
                    setRoomNoToNick(user.getNickName(),room.getRoomNo());
                    typingRoomRepository.save(room);
                    typingUserRepository.save(user);
                    return room.getRoomNo();
                }
            }
            //방입장에 실패했음
            return null;
        }
        else
        {
            //기존에 참가 가능한 방이 있는지 체크 하는 부분
            for (TypingRoom room: roomAll)
            {
                if(room.getUsers().size()<4 && room.getLang().equals(lang))
                {
                    room.getUsers().add(user);
                    setRoomNoToNick(user.getNickName(),room.getRoomNo());
                    typingUserRepository.save(user);
                    typingRoomRepository.save(room);
                    return room.getRoomNo();
                }
            }

            //방을 새로 만들어야 하는 경우
            TypingRoom room = new TypingRoom();
            List<TypingUser> userList = new ArrayList<>();


            room.setRoomNo(user.getSocketId());
            room.setLang(lang);
            //나중에 mysql에서 가져와야함
            room.setContent("test1  \n   tetsste \n dkdkd");
            user.setIsHead(true);
            userList.add(user);
            room.setUsers(userList);
            setRoomNoToNick(user.getNickName(),room.getRoomNo());
            typingRoomRepository.save(room);
            typingUserRepository.save(user);
            return user.getSocketId();
        }

    }



    public Optional<TypingRoom> getRoom(String roomNo)
    {
        return typingRoomRepository.findById(roomNo) ;
    }

    //content 반환
    public String startRoom(String roomNo)
    {

        TypingRoom typingRoom = typingRoomRepository.findById(roomNo).get();
        typingRoom.setStartTime(TypingStaticData.timeMaker());
        typingRoom.setStart(true);
        typingRoomRepository.save(typingRoom);
        return  typingRoom.getContent();
    }

    public void exitRoom(String nick)
    {
        if(isPlay.isPlayCheck(nick))
            isPlay.isPlayDel(nick);

        TypingUser typingUser;
        TypingRoom typingRoom;

        if(!typingUserRepository.findById(nick).isPresent())
        {
            System.out.println("typingUserRepository.findById(nick).isPresent() 없음");
            return;
        }


        typingUser = typingUserRepository.findById(nick).get();
        String roomNo =getRoomNoToNick(nick);

//        if(typingRoomRepository.findById(roomNo).isPresent())
             typingRoom = typingRoomRepository.findById(roomNo).get();

        typingUserRepository.deleteById(nick);
        delRoomNoToNick(nick);

        //게임 시작하면 유저 나가도 목록에서 안꺼낼거임
        if(!typingRoom.isStart())
        {
            for (TypingUser tu: typingRoom.getUsers())
            {
                if(tu.getNickName().equals(nick))
                {
                    typingRoom.getUsers().remove(tu);
                    break;
                }
            }
        }


        //방 삭제 해야함
        if(typingRoom.getUsers().size()==0)
        {
            if(typingRoom.getRoomCode()!=null && typingRoom.getRoomCode().equals(""))
                delRoomNoToRoomCode(typingRoom.getRoomCode());

            typingRoomRepository.deleteById(roomNo);
            return;
        }

        if(typingUser.getIsHead())
        {
            typingRoom.getUsers().get(0).setIsHead(true);
        }
        typingRoomRepository.save(typingRoom);
    }

    public ScoreResultDto check(CheckParamDto paramDto)
    {
        ScoreResultDto resultDto = new ScoreResultDto();
        resultDto.setUsers(new ArrayList<>());


        TypingRoom typingRoom = typingRoomRepository.findById(paramDto.getRoomNo()).get();


        System.out.println("/typing/check 에서 불러온  typingRoom 값");
        System.out.println(typingRoom);

        String content = typingRoom.getContent();
        String[] contents = content.split("\n");
        int contentLen = content.length()-(contents.length-1)*2;
        int startTime =typingRoom.getStartTime();

        //게임 맞,틀 증가 후 다시 저장해줘야함
        boolean endCheck =false;
        int maxProgress =0;

        for (TypingUser typingUser: typingRoom.getUsers())
        {
            ScoreUserDto scoreUserDto = new ScoreUserDto();
            int trues =typingUser.getTrues();
            int errors =typingUser.getErrors();
            if(paramDto.getNickName().equals(typingUser.getNickName()))
            {
                if(paramDto.isCheck())
                    trues++;
                else
                    errors++;


                typingUser.setTrues(trues);
                typingUser.setErrors(errors);

                typingRoomRepository.save(typingRoom);
            }

            int nowTime = TypingStaticData.timeMaker();

            int time =startTime-nowTime;
            if(time<0)
                time+=3600;

            scoreUserDto.setProgress((trues*100)/contentLen);
            scoreUserDto.setErrors(errors);
            scoreUserDto.setNickName(typingUser.getNickName());
            scoreUserDto.setTypeSpeed((trues*60)/time);
            if(trues+errors==contentLen)
                resultDto.setEnd(true);
            if(maxProgress<scoreUserDto.getProgress())
            {
                maxProgress=scoreUserDto.getProgress();
                scoreUserDto.setRank(1);
            }

            resultDto.getUsers().add(scoreUserDto);
        }

        return resultDto;

    }
}
