package com.ssafy.gaese.domain.algorithm.application;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.ssafy.gaese.domain.algorithm.dto.AlgoProblemDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseService {

    private FirebaseDatabase database;
    private DatabaseReference databaseReference;

    public List<AlgoProblemDto> getTierProblems() throws ExecutionException, InterruptedException {
        String tier ="11";
        Firestore db = FirestoreClient.getFirestore();
        List<AlgoProblemDto> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture=
                db.collection("problems").get();
        QuerySnapshot querySnapshot = apiFuture.get();
        for(DocumentSnapshot documentSnapshot : querySnapshot){
            if(documentSnapshot.exists()){
                Map<String,Object> map = documentSnapshot.getData();
                System.out.println(map.toString());
                AlgoProblemDto algoProblemDto = new AlgoProblemDto((String) map.get("problemId"),Integer.parseInt((String) map.get("correct"))
                ,(String)map.get("ratio"),Integer.parseInt((String) map.get("submit")),(String) map.get("tag"),(String)map.get("title"));

                list.add(algoProblemDto);
            }
        }
        System.out.println(list.toString());
        return list;
    }

}
