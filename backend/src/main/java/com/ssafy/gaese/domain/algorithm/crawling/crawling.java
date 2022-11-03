package com.ssafy.gaese.domain.algorithm.crawling;

import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class crawling {


    public void init(String userId){
        userId = "dusdml1502";

        ChromeOptions options = new ChromeOptions();
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        WebDriver driver = new ChromeDriver(options);


        driver.get("https://www.acmicpc.net/user/"+userId);
        WebElement element = driver.findElement(By.className("problem-list"));

        System.out.println(element);
        System.out.println(element.getText());

    }

}

