package com.ssafy.gaese.domain.typing.controller;


import com.ssafy.gaese.domain.typing.application.IsPlay;
import com.ssafy.gaese.domain.typing.application.TypingRoomApp;
import com.ssafy.gaese.domain.typing.application.TypingUserApp;
import com.ssafy.gaese.domain.typing.common.TypingStaticData;
import com.ssafy.gaese.domain.typing.dto.*;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/typing")
@RequiredArgsConstructor
public class TypingEnterController {

	@Autowired
	TypingUserApp typingUserApp;

	@Autowired
	TypingRoomApp typingRoomApp;


	//나중에 요청해서 service에 기능 만들어서 쓰는게 좋을듯함
	@Autowired
	UserRepository userRepository;

	@Autowired
	IsPlay isPlay;

	private final SimpMessageSendingOperations sendingOperations;





	@PostMapping("/enter")
	public ResponseEntity<EnterResultDto> enter(@RequestBody EnterParamDto param)
	{
		EnterResultDto resultDto = new EnterResultDto();
		//방 만드는 경우 사용할 예정
		TypingRoom typingRoom = new TypingRoom();

		TypingUser typingUser = new TypingUser();

		//이미 플레이 중인지 체크
		//true 면 플레이 중인거임
		if(isPlay.isPlayCheck(param.getNickName()))
		{
			resultDto.setPlay(false);

			//이거 http 정해야함
			return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
		}


		resultDto.setPlay(true);
		resultDto.setRoomCodeCheck(true);
		resultDto.setUsers(new ArrayList<EnterUserDto>());



		User userE = userRepository.findById(param.getId())
				.orElseThrow((()->new UserNotFoundException()));

		typingUser.setImgUrl(userE.getImg());
		typingUser.setNickName(param.getNickName());
		typingUser.setSocketId(param.getSocketId());
		typingUserApp.setUser(typingUser);

		//친선전 참가하는 경우, null이 아니면 친선전참가
		if(param.getRoomCode()!=null)
		{
			resultDto.setRoomNo(typingRoomApp.getRoomCodeToRoomNo(param.getRoomCode()));
			resultDto.setRoomCode(param.getRoomCode());
			//roomCode가 잘못된 코드인 경우
			if(resultDto.getRoomCode()==null)
			{
				resultDto.setRoomCodeCheck(false);
				return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
			}

			typingRoomApp.enterUser(typingUser,resultDto.getRoomCode());



//			return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
		}
		//친선전 만드는 경우 true 면 방생성
		else if(param.isCreat())
		{
			//중복코드 생성 될 수도있음 나중에 처리 해줘야함
			//룸코드 생성
			typingRoom.setRoomCode(TypingStaticData.roomCodeMaker());
			resultDto.setRoomCode(typingRoom.getRoomCode());

			//나중에 db에서 가져와서 넣는 로직 만들어 줘야함
			typingRoom.setContent("test");

			resultDto.setRoomNo(param.getSocketId());
			typingRoom.setRoomNo(param.getSocketId());
			typingRoom.setLang(param.getLang());
			typingRoom.setStartTime(TypingStaticData.timeMaker());

			//방 만든 다음 유저 넣어야 유저 리스트에 추가됨
			typingRoomApp.makeRoom(typingRoom);
			typingRoomApp.enterUser(typingUser, resultDto.getRoomCode());
		}
		//랜덤매칭 하는 경우
		else
		{

			typingRoomApp.enterUser(typingUser, null);

		}

		typingUserApp.setUser(typingUser);

		List<String> nickList = typingRoomApp.getUserList(resultDto.getRoomNo());

		for (String nick: nickList)
		{
			EnterUserDto eud = new EnterUserDto();
			eud.setImgUrl(typingUserApp.getVar(nick,"imgUrl"));
			eud.setNickName(typingUserApp.getVar(nick,nick));
			eud.setHead(Boolean.parseBoolean(typingUserApp.getVar(nick,"isHead")));
			resultDto.getUsers().add(eud);
		}
		sendingOperations.convertAndSend("/topic/typing"+resultDto.getRoomNo()+"/userList", resultDto.getUsers());

		//나중에 타이머 걸어서 구현 하고 일단은 바로 시작하게 만듬듬
		int maxSize=4;
		if(resultDto.getUsers().size()==maxSize)
		{
			StartResultDto startResultDto = new StartResultDto();
			startResultDto.setContent(Arrays.asList(typingRoomApp.getVar(resultDto.getRoomNo(), "content").split("\n")));
			sendingOperations.convertAndSend("/topic/typing"+resultDto.getRoomNo()+"/start", startResultDto);
		}
		return new ResponseEntity<EnterResultDto>(resultDto, HttpStatus.OK);
	}





//	@PostMapping("/test")
//	public ResponseEntity<String> test()
//	{
//
////		TypingUser resultDto = new TypingUser();
////		final ListOperations<String, String> stringStringListOperations = redisTemplate.opsForList();
//		SetOperations<String, ListOperations<String, String>> SetOperations = redisTemplate.opsForSet();
////		redisTemplate.opsForList();
//		HashOperations<String, String, List<String >> hashOperations
//				= redisTemplate.opsForHash();
//
//		String hashKey ="typing";
//
//		List<TypingUser> users = new ArrayList<>();
//		List<String> strL = new ArrayList<>();
//		strL.add("test");
//		strL.add("ge");
//		TypingUser tu = new TypingUser();
//		tu.setNickName("a111a");
//		users.add(tu);
//		String pre = "UserList";
//		typingUserApp.userDel("tmp");
//		hashOperations.put("typing", hashKey,strL);
//		hashOperations.put("typing", hashKey,strL);
//		return new ResponseEntity<String>("goot", HttpStatus.OK);
//	}
//
//	@PostMapping("/test2")
//	public ResponseEntity<String> test2()
//	{
//		HashOperations<String, String, List<String >> SSLhashOperations
//				= redisTemplate.opsForHash();
//
//
//		List<String> hello = SSLhashOperations.get("typing", "typing");
//
//		System.out.println(hello);
//
//		return new ResponseEntity<String>(hello.toString(), HttpStatus.OK);
//	}
//	@PostMapping("/test3")
//	public ResponseEntity<String> test3()
//	{
//		isPlay.isPlaySet("test");
//		return new ResponseEntity<String>("test", HttpStatus.OK);
//	}
//	@PostMapping("/test4")
//	public ResponseEntity<String> test4()
//	{
//		Boolean b =isPlay.isPlayCheck("test");
//		return new ResponseEntity<String>(b.toString(), HttpStatus.OK);
//	}
}

