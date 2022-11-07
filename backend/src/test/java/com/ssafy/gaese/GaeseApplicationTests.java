package com.ssafy.gaese;

import com.ssafy.gaese.domain.algorithm.dto.AlgoRoomDto;
import io.swagger.models.auth.In;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import static com.ssafy.gaese.global.util.SocketUtil.roomCodeMaker;

@SpringBootTest
class GaeseApplicationTests {

	/*

    방 고유 번호 :
        방 제한 시간 :
        방 풀 문제 티어 :
        현재 인원 :
    참가자 :
        {socketId : userNickName}
        {socketId : userNickName}
        {socketId : userNickName}

     */

	@Autowired
	private RedisTemplate<String,String> roomTemplate;
	@Autowired
	private RedisTemplate<String, Object> roomUserTemplate;


	@Autowired
	private RedisTemplate<String,String> stringTemplate;
	@Autowired
	private RedisTemplate<String, AlgoRoomDto>	algoRoomDtoRedisTemplate;

	String roomCode="setV11kc";
	@Test
	void testRoomInfo(){

		roomTemplate.opsForList().rightPush("algo","1");
		roomTemplate.opsForList().rightPush("algo","2");

		// 마지막 인덱스 가져오기
		List<String> list = (List<String>) roomTemplate.opsForList().range("algo", -1, -1);
		int lastIndex = Integer.parseInt(list.get(0));
		System.out.println(lastIndex);
		// 방 생성
		roomTemplate.opsForList().rightPush("algo",lastIndex+1+"");

		// 생성된 방 리스트 가져오기
		List<String> totalList = (List<String>) roomTemplate.opsForList().range("algo", 0, -1);
		System.out.println(totalList.toString());

		// 특정 방 삭제하기
		/*
			count > 0 : head 부터 순차적으로 조회하며 count의 절대값에 해당하는 개수만큼 제거
			count < 0 : tail 부터 순차적으로 조회하며 count의 절대값에 해당하는 개수만큼 제거
			count = 0 : 모두 조회한 후 value에 해당하는 값 모두 제거
		 */
		roomTemplate.opsForList().remove("algo",-1,"2");
		totalList = (List<String>) roomTemplate.opsForList().range("algo", 0, -1);
		System.out.println("remove");
		System.out.println(totalList.toString());

		totalList = (List<String>) roomTemplate.opsForList().range("algo", -1, -1);
		// 방에 사용자 입장
		int room = Integer.parseInt(totalList.get(0));

		roomUserTemplate.opsForList().rightPush("algo"+room, "user1");

		System.out.println(roomUserTemplate.opsForList().range("algo"+room, 0, -1));

	}


	@Test
	void checkCode(){

		while(true){
			String code = roomCodeMaker();
			ListOperations<String,String> list = stringTemplate.opsForList();

			List<String> codeList  = list.range("codes",0,-1);
			System.out.println(codeList.toString());
			if(codeList.contains(code)) continue;
			list.rightPush("codes",code);
			list.rightPush("algoCodes",code);
			break;
		}
	}

	@Test
	void deleteCode(){
		ListOperations<String,String > listOperations = stringTemplate.opsForList();

		System.out.println(listOperations.remove("algoCodes",1,roomCode)); // return 1 : success
		System.out.println(listOperations.remove("codes",1,roomCode)); // return 1 : success

	}

	@Test
	void getRooms1(){
		ListOperations<String, AlgoRoomDto> roomList = algoRoomDtoRedisTemplate.opsForList();
		ListOperations<String, String> codeList  = stringTemplate.opsForList();
		List<String> codes  = codeList.range("algoCodes",0,-1);
		Map<String, Object> map = new HashMap<>();
		List<AlgoRoomDto> roomDtoList = new ArrayList<>();

		for(String roomCode : codes){
			HashOperations<String,String,AlgoRoomDto > hashOperations = algoRoomDtoRedisTemplate.opsForHash();
			AlgoRoomDto algoRoomDto = hashOperations.entries(roomCode).get(codes);
			System.out.println(hashOperations.entries(roomCode).get(codes));
			roomDtoList.add(algoRoomDto);
		}

	}
	@Test
	void enterRoom(){
		HashOperations<String ,String,String > hashOperations = stringTemplate.opsForHash();
		hashOperations.put(roomCode+"user","user3","session3");
		hashOperations.increment(roomCode,"num",1);
		hashOperations.put(roomCode+"user","user4","session4");
		hashOperations.increment(roomCode,"num",1);

		Map<String,String> list = hashOperations.entries(roomCode+"user");
		List<String> users = new ArrayList<>();

		for (String key : list.keySet()) {
			users.add(key);
		}
		System.out.println(users.toString()); // return 방에 있는 사람 list
	}

	@Test
	void leaveRoom(){
		HashOperations<String ,Object,String > hashOperations = stringTemplate.opsForHash();

		hashOperations.delete(roomCode+"user","user3");
		hashOperations.increment(roomCode,"num",-1);

		Map<Object,String> list = hashOperations.entries(roomCode+"user");
		System.out.println(list.toString()); // return 방에 있는 사람 list
	}

	@Test
	void deleteRoom(){
		stringTemplate.delete(roomCode);
		stringTemplate.delete(roomCode+"user"); // return 1 : success
	}

	@Test
	void testSet(){
		HashOperations<String, Object, String> hashOperations = roomTemplate.opsForHash();

		HashMap<String,Object> hmap = new HashMap<>();
		HashMap<String,String> roomInfo = new HashMap<>();

		roomInfo.put("user1","session1");
		roomInfo.put("user2","session2");

		hashOperations.put("algo","2","234.234");
		hashOperations.put("algo","1","13.123");
		Map<Object, String> a =  hashOperations.entries("algo");
		System.out.println(a.toString());
	}


	@Test
	void testString(){
		// given
		ValueOperations<String,String> valueOperations = roomTemplate.opsForValue();
		String key = "redis test key";
		String id = "redis test id";

		//when
		valueOperations.set(key,id);

		//then
		String value = valueOperations.get(key);
		System.out.println(value);

	}

}
