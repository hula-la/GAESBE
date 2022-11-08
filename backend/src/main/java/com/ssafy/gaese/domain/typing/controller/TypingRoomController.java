package com.ssafy.gaese.domain.typing.controller;


import com.ssafy.gaese.domain.typing.application.IsPlay;
import com.ssafy.gaese.domain.typing.common.TypingStaticData;
import com.ssafy.gaese.domain.typing.dto.*;
import com.ssafy.gaese.domain.typing.service.TypingRoomService;
import com.ssafy.gaese.domain.typing.service.TypingUserService;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.global.redis.SocketInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TypingRoomController {

    //나중에 요청해서 service에 기능 만들어서 쓰는게 좋을듯함
    @Autowired
    UserRepository userRepository;
    @Autowired
    TypingRoomService typingRoomService;
    @Autowired
    TypingUserService typingUserService;

    @Autowired
    IsPlay isPlay;
    @Autowired
    SocketInfo socketInfo;

    private final SimpMessageSendingOperations sendingOperations;





    @MessageMapping("/typing/enter")
    public synchronized void enter(EnterParamDto param) throws InterruptedException {



        //세션 id , 와 각종 정보들 매칭
        socketInfo.setSocketInfo( param.getSocketId(), param.getId().toString(),param.getRoomCode(),"Typing",param.getNickName());


        System.out.println("\n  @MessageMapping /typing/enter   param 확인");
        System.out.println(param);
        EnterResultDto resultDto = new EnterResultDto();
        //방 만드는 경우 사용할 예정
        TypingRoom typingRoom = new TypingRoom();

        TypingUser typingUser = new TypingUser();

        String roomNo="";
        //이미 플레이 중인지 체크
        //true 면 플레이 중인거임
        System.out.println("플레이 중인지 체크");
        System.out.println(isPlay.isPlayCheck(param.getNickName()));
        if(isPlay.isPlayCheck(param.getNickName()))
        {
            resultDto.setPlay(false);

            //이거 http 정해야함
//            return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
            sendingOperations.convertAndSend("/topic/typing/"+param.getId()+"/enter", resultDto);
            return;
        }

        isPlay.isPlaySet(param.getNickName());
        System.out.println("(isPlay.isPlayCheck(param.getNickName())");
        System.out.println((isPlay.isPlayCheck(param.getNickName())));

        resultDto.setPlay(true);
        resultDto.setRoomCodeCheck(true);
        resultDto.setUsers(new ArrayList<EnterUserDto>());
        List<TypingUser> userList;


        User userE = userRepository.findById(param.getId())
                .orElseThrow((()->new UserNotFoundException()));

        System.out.println("db에서 가져온정보");
        System.out.println(userE);

        typingUser.setId(param.getId());
        typingUser.setImgUrl(userE.getImg());
        typingUser.setNickName(param.getNickName());
        typingUser.setSocketId(param.getSocketId());



        System.out.println("getRoomcode");
        System.out.println(param.getRoomCode());
        //친선전 참가하는 경우
        if(param.getRoomCode()!=null && param.getRoomCode()!="")
        {

            System.out.println("param.getRoomCode()!=null\n\n");
            resultDto.setRoomNo(typingRoomService.getRoomNoToRoomCode(param.getRoomCode()));
            resultDto.setRoomCode(param.getRoomCode());

            //null 이면 참가 가능한 방을 못찾은경우
            //여기서 방에 들어감
            roomNo=typingRoomService.enterRoom(typingUser,resultDto.getRoomCode(),param.getLang());
            //roomCode가 자체가 없는 코드인 경우

            if(resultDto.getRoomCode()==null ||resultDto.getRoomCode().equals("")
            || roomNo==null)
            {
                resultDto.setRoomCodeCheck(false);
                sendingOperations.convertAndSend("/topic/typing/"+param.getId()+"/enter", resultDto);
                return;
            }
            userList =typingRoomService.getRoom(param.getRoomCode()).get().getUsers();

        }
        //친선전 만드는 경우 true 면 방생성
        else if(param.isCreat())
        {

            //중복코드 생성 될 수도있음 나중에 처리 해줘야함
            //룸코드 생성
            typingRoom.setRoomCode(TypingStaticData.roomCodeMaker());
            resultDto.setRoomCode(typingRoom.getRoomCode());

            typingRoom.setRoomNo(param.getSocketId());
            resultDto.setRoomNo(param.getSocketId());

            typingRoom.setLang(param.getLang());
            typingRoom.setStartTime(TypingStaticData.timeMaker());

            typingUser.setIsHead(true);
            //방 만든 다음 유저 넣어야 유저 리스트에 추가됨
            typingRoomService.roomMaker(typingRoom);
            typingRoomService.enterRoom(typingUser, resultDto.getRoomCode(),param.getLang());
            userList = new ArrayList<>();
            userList.add(typingUser);


        }
        //랜덤매칭 하는 경우
        else
        {
            System.out.println("\n\n\n\n랜매 하는 경우로 들어왔음 \n\n\n\n");
            roomNo = typingRoomService.enterRoom(typingUser,null,param.getLang());
            userList =typingRoomService.getRoom(roomNo).get().getUsers();
            resultDto.setRoomNo(roomNo);
        }




        for (TypingUser user: userList)
        {
            System.out.println("nick : "+user);
            EnterUserDto eud = new EnterUserDto();
            eud.setImgUrl(user.getImgUrl());
            eud.setNickName(user.getNickName());
            eud.setHead(user.getIsHead());
            resultDto.getUsers().add(eud);
        }

        //나중에 타이머 걸어서 구현 하고 일단은 바로 시작하게 만듬
        int maxSize=4;
        if(resultDto.getUsers().size()==maxSize)
        {
            StartResultDto contentDto = new StartResultDto();
            String con=typingRoomService.startRoom(param.getRoomCode());

            String[] contens =con.split("\n");
            contentDto.setContent(Arrays.asList(contens));


            sendingOperations.convertAndSend("/topic/typing/"+param.getId()+"/enter", resultDto);
            Thread.sleep(50);
            sendingOperations.convertAndSend("/topic/typing/"+resultDto.getRoomNo()+"/start", resultDto.getUsers());
        }
        else
        {
            sendingOperations.convertAndSend("/topic/typing/"+param.getId()+"/enter", resultDto);
            sendingOperations.convertAndSend("/topic/typing/"+resultDto.getRoomNo()+"/userList", resultDto.getUsers());
        }
//        return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
    }




    @MessageMapping("/typing/check")
    public void typingCheck(CheckParamDto paramDto) throws Exception {

        ScoreResultDto resultDto = typingRoomService.check(paramDto);


        sendingOperations.convertAndSend("/topic/typing/"+paramDto.getRoomNo()+"/score", resultDto);

        if(resultDto.isEnd())
            sendingOperations.convertAndSend("/topic/typing/"+paramDto.getRoomNo()+"/end", resultDto);

        return;
    }


}
