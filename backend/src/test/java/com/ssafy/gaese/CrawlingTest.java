package com.ssafy.gaese;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CrawlingTest {
    ChromeOptions options = new ChromeOptions();


    WebDriver driver = new ChromeDriver(options);
    @Test
    void get_solved_problem(){
        String userId = "dusdml1502";
        driver.get("https://www.acmicpc.net/user/"+userId);
        WebElement element = driver.findElement(By.className("problem-list"));
        List<String> problems = List.of(element.getText().split(" "));

        System.out.println(problems.toString());

    }



}
