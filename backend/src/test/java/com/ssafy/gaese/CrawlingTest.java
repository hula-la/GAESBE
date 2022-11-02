package com.ssafy.gaese;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemDto;
import com.ssafy.gaese.global.config.FirebaseConfig;
import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.*;
import java.util.concurrent.ExecutionException;

@SpringBootTest
public class CrawlingTest {


    @Autowired
    private  RedisTemplate<String, String> redisTemplate;

    @Test
    void get_solved_problem(){
        SetOperations<String,String> setOperations = redisTemplate.opsForSet();
        String key = "roomCode-userproblem";

        System.setProperty("webdriver.chrome.driver","C:\\final\\backend\\S07P31E104\\backend\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless"); // 창 없이 크롤링
        WebDriver driver = new ChromeDriver(options);

        String userId = "dusdml1502";
        driver.get("https://www.acmicpc.net/user/"+userId);
        WebElement element = driver.findElement(By.className("problem-list"));
        List<String> problems = List.of(element.getText().split(" "));

        for(String problem : problems){
            setOperations.add(key,problem);
        }

        System.out.println("확인");
        System.out.println(setOperations.members(key));

        driver.quit();
    }


    @Test
    void get_tier_problems() throws ExecutionException, InterruptedException, IOException {


        String tier ="1";
        Firestore db = FirestoreClient.getFirestore();
        List<AlgoProblemDto> list = new ArrayList<>();
        Query query=
                db.collection(tier).orderBy("submit", Query.Direction.DESCENDING);
        QuerySnapshot querySnapshot = query.get().get();
        for(int i = 0 ; i < 50; i++ ){
            DocumentSnapshot documentSnapshot =querySnapshot.getDocuments().get(i);
            if(documentSnapshot.exists()){
                Map<String,Object> map = documentSnapshot.getData();
                System.out.println(map.toString());
                AlgoProblemDto algoProblemDto = new AlgoProblemDto(map.get("problemId").toString(),Integer.parseInt(map.get("correct").toString())
                        ,map.get("ratio").toString(),Integer.parseInt(map.get("submit").toString()),map.get("tag").toString(),map.get("title").toString());

                list.add(algoProblemDto);
            }
        }
        System.out.println(list.toString());
    }

    @Test
    void get_common_problems(){

    }


}
