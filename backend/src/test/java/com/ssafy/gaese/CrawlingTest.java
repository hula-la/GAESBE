package com.ssafy.gaese;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemDto;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemRedisDto;
import com.ssafy.gaese.domain.algorithm.repository.AlgoRedisRepository;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@SpringBootTest
public class CrawlingTest {


    @Autowired
    private  RedisTemplate<String, String> redisTemplate;
    @Autowired
    private AlgoRedisRepository algoRedisRepository;
    static String roomCode="z1dZqaW1";


    @Test
    void get_solved_problem(){
        SetOperations<String,String> setOperations = redisTemplate.opsForSet();
//    setOperations.add("sd","sd");


        System.setProperty("webdriver.chrome.driver","C:\\final\\backend\\S07P31E104\\backend\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless"); // 창 없이 크롤링
        WebDriver driver = new ChromeDriver(options);

        //"wnstlr0394";
        String userId = "wnstlr0394"; // 백준 아이디
        String key = roomCode+"-"+userId;

        driver.get("https://www.acmicpc.net/user/"+userId);
        WebElement element = driver.findElement(By.className("problem-list"));
        List<String> problems = List.of(element.getText().split(" "));

        for(String problem : problems){
            setOperations.add(key,problem);
        }
        redisTemplate.expire(key,60*60*24, TimeUnit.SECONDS);
        System.out.println("확인");
        System.out.println(setOperations.members(key));

        driver.quit();
    }
    @Value("${firebase-sdk-path}")
    private String firebaseSdkPath;

    public List<AlgoProblemDto> get_tier_problems(String tier) throws ExecutionException, InterruptedException, IOException {
//        FileInputStream serviceAccount =
//                new FileInputStream(firebaseSdkPath);
//
//        FirebaseOptions options = FirebaseOptions.builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .setDatabaseUrl("https://ssafy-final-pjt-3addc-default-rtdb.firebaseio.com")
//                .build();
//
//        FirebaseApp.initializeApp(options);

//        String tier = "1";
        Firestore db = FirestoreClient.getFirestore();
        List<AlgoProblemDto> list = new ArrayList<>();
        Query query =
                db.collection(tier).orderBy("submit", Query.Direction.DESCENDING);
        QuerySnapshot querySnapshot = query.get().get();
        int len = querySnapshot.size();
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

    @Test
    void get_common_problems() throws IOException, ExecutionException, InterruptedException {
        List<AlgoProblemDto> algoProblemDtoList = get_tier_problems("2");
        SetOperations setOperations = redisTemplate.opsForSet();

        List<String> users = new ArrayList<>();
        users.add("dusdml1502");
        users.add("wnstlr0394");
        String code = "z1dZqaW1";

        // 공통 문제 리스트=
        Set<String> problemsSet = new HashSet<>();

        for(String user : users){
            problemsSet.addAll(setOperations.members(code+"-"+user));

        }

        System.out.println("common");
        System.out.println(problemsSet.toString());

        for(int i = algoProblemDtoList.size()-1 ; i >= 0; i-- ){
            if(problemsSet.contains(algoProblemDtoList.get(i).getProblemId()))
                algoProblemDtoList.remove(algoProblemDtoList.get(i));
        }
        Collections.shuffle(algoProblemDtoList);
        List<AlgoProblemDto> result = algoProblemDtoList.subList(0,10);
        System.out.println(result.toString());
//        algoRedisRepository.save(result.get(0));

        AlgoProblemRedisDto algoProblemRedisDto = new AlgoProblemRedisDto();
        algoProblemRedisDto.setProblemDtoList(algoProblemDtoList);
        algoProblemRedisDto.setRoomCode("z1dZqaW1");
        algoRedisRepository.save(algoProblemRedisDto);

    }

    @Test
    void get_problems(){
        Iterable<AlgoProblemRedisDto> algoProblemRedisDtos = algoRedisRepository.findAllById(Collections.singleton("z1dZqaW1"));
        for(AlgoProblemRedisDto algoProblemDto : algoProblemRedisDtos){
            System.out.println(algoProblemDto);
        }
        ListOperations listOperations = redisTemplate.opsForList();

    }

}
