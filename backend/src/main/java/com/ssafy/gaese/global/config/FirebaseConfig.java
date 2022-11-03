package com.ssafy.gaese.global.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase-sdk-path}")
    private String firebaseSdkPath;

    @PostConstruct
    public void initialize() throws IOException {
        try{
            FileInputStream serviceAccount =
                    new FileInputStream(firebaseSdkPath);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://ssafy-final-pjt-3addc-default-rtdb.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);

        }catch(FileNotFoundException e){
            System.out.println(e.getMessage());

        } catch (IOException e){
            System.out.println(e.getMessage());
        }

    }
}
