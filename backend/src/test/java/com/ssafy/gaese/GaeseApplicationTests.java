package com.ssafy.gaese;

import io.swagger.models.auth.In;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.hash.HashMapper;

import java.util.*;

@SpringBootTest
class GaeseApplicationTests {

/*

"algo" : ["1","2","3","4"]
"algo1" : ["i","f","e"]

 */
	@Autowired
	private RedisTemplate<String,String> roomTemplate;
	@Autowired
	private RedisTemplate<String, Object> roomUserTemplate;
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
