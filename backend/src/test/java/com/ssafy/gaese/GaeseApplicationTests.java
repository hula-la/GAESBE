package com.ssafy.gaese;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.hash.HashMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@SpringBootTest
class GaeseApplicationTests {


	@Autowired
	private RedisTemplate<String,String> redisTemplate;
	@Autowired
	private RedisTemplate<String, Object> roomTemplate;

	@Test
	void testRoomInfo(){

		roomTemplate.opsForList().leftPush("1","value");

		List<Object>  aa  = roomTemplate.opsForList().range("1",0,-1);
		for( Object s : aa) {
			System.out.println(s);
		}

	}
/*
"algo":
	"1" : {"user1","user2","user3"}

	"algo1" : ["user1","user2","user3"]
 */
	@Test
	void testSet(){
		HashOperations<String, Object, Object> hashOperations = roomTemplate.opsForHash();
		HashMap<String,Object> hmap = new HashMap<>();
		HashMap<String,String> roomInfo = new HashMap<>();
		roomInfo.put("user1","session1");
		roomInfo.put("user2","session2");

		hashOperations.put("algo","1",roomInfo);
		HashMap<String,String> a = (HashMap<String, String>) hashOperations.get("algo","1");
		System.out.println(a.toString());

	}

	@Test
	void testString(){
		// given
		ValueOperations<String,String> valueOperations = redisTemplate.opsForValue();
		String key = "redis test key";
		String id = "redis test id";

		//when
		valueOperations.set(key,id);

		//then
		String value = valueOperations.get(key);
		System.out.println(value);

	}

}
