package com.ssafy.gaese.domain.algorithm.application;



import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemReq;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AlgoProblemService {

    @Value("${chrome-driver-path}")
    private String ChromePath;
    private final RedisTemplate<String, String> redisTemplate;

    public void getSolvedProblem(String roomCode, String userBjId){
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        String key = roomCode+"-"+userBjId;
        List<String> problems = new LinkedList<>();
        // 크롤링 설정
        try{
            System.setProperty("webdriver.chrome.driver",ChromePath);
            ChromeOptions options = new ChromeOptions();
            options.addArguments("headless"); // 창 없이 크롤링
            WebDriver driver = new ChromeDriver(options);
            // 크롤링
            driver.get("https://www.acmicpc.net/user/"+userBjId);
            WebElement element = driver.findElement(By.className("problem-list"));
            problems = List.of(element.getText().split(" "));

        }catch (Exception e){
            /** 크롤링 에러처리 */
        }
        if(problems.size()==0) setOperations.add(key,"0");
        //레디스 저장
        for(String problem : problems){
            setOperations.add(key,problem);
        }
        redisTemplate.expire(key,60*60*24, TimeUnit.SECONDS);
    }

    public List<AlgoProblemDto> getTierProblems(String tier) throws ExecutionException, InterruptedException, IOException {

        FirebaseApp firebaseApp = null;
        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();

        if(firebaseApps != null && !firebaseApps.isEmpty()){

            for(FirebaseApp app : firebaseApps) {
                if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    firebaseApp = app;
                }
            }

        }else{
            FileInputStream serviceAccount =
                    new FileInputStream(ResourceUtils.getFile("classpath:firebaseKey.json"));
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://ssafy-final-pjt-3addc-default-rtdb.firebaseio.com")
                    .build();
            firebaseApp = FirebaseApp.initializeApp(options);
        }

//        FileInputStream serviceAccount =
//                new FileInputStream(firebaseSdkPath);
//
//        FirebaseOptions options = FirebaseOptions.builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .setDatabaseUrl("https://ssafy-final-pjt-3addc-default-rtdb.firebaseio.com")
//                .build();
//
//        FirebaseApp.initializeApp(options);

        Firestore db = FirestoreClient.getFirestore();
        List<AlgoProblemDto> list = new ArrayList<>();
        Query query =
                db.collection(tier).orderBy("submit", Query.Direction.DESCENDING);
        QuerySnapshot querySnapshot = query.get().get();
        int len = querySnapshot.size();
        System.out.println(tier +"개수 : "+len);
        len  = len < 50 ? len : 50;
        for (int i = 0; i < len; i++) {
            DocumentSnapshot documentSnapshot = querySnapshot.getDocuments().get(i);
            if (documentSnapshot.exists()) {
                Map<String, Object> map = documentSnapshot.getData();
                AlgoProblemDto algoProblemDto = new AlgoProblemDto(map.get("problemId").toString(), Integer.parseInt(map.get("correct").toString())
                        , map.get("ratio").toString(), Integer.parseInt(map.get("submit").toString()), map.get("tag").toString(), map.get("title").toString());

                list.add(algoProblemDto);
            }
        }
        return list;
    }

    public List<AlgoProblemDto> getCommonProblems(String roomCode, AlgoProblemReq algoProblemReq) throws ExecutionException, InterruptedException, IOException {
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        List<AlgoProblemDto> algoProblemDtoList = getTierProblems(algoProblemReq.getTier()); // 티어 전체 문제
        Set<String> problemsSet = new HashSet<>();

        for(String user : algoProblemReq.getUsers()){
            problemsSet.addAll(setOperations.members(roomCode+"-"+user));

        }
        for (int i = algoProblemDtoList.size() - 1; i >= 0; i--) {
            if (problemsSet.contains(algoProblemDtoList.get(i).getProblemId()))
                algoProblemDtoList.remove(algoProblemDtoList.get(i));
        }
        System.out.println("=====> 최종 문제 수 : " + algoProblemDtoList.size());
        // list 섞고 그 중 10개 가져오기
        Collections.shuffle(algoProblemDtoList);
        return algoProblemDtoList.subList(0, 10);
    }

}
