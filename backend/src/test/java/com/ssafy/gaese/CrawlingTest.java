package com.ssafy.gaese;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

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
//        System.out.println(Arrays.toString(problems));
        for(String problem : problems){
            setOperations.add(key,problem);
        }

        System.out.println("확인");
        System.out.println(setOperations.members(key));

        driver.quit();
    }

    @Test
    void
}
