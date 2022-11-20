package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.algorithm.entity.AlgoRecord;
import com.ssafy.gaese.domain.friends.application.FriendSocketService;
import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.item.Characters;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.exception.AlreadyCheckException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AttendanceRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.repository.item.CharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.UserCharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    private final ItemService itemService;

    private final FriendSocketService friendSocketService;

    private final UserCharacterRepository userCharacterRepository;

    private final CharacterRepository characterRepository;


    public boolean attendanceCheck(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());

        String now = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
        boolean isChecked = attendanceRepository.existsByUserAndDate(user, now);

        if (isChecked) throw new AlreadyCheckException();
        Attendance attendance = Attendance.builder()
                .user(user)
                .date(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                .build();

        attendanceRepository.save(attendance);
        charChecker(userId);
        return true;
    }

    public List<String> getAttendance(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());

        List<String> AttendanceByUser = attendanceRepository.findByUser(user).stream().map(d->d.getDate()).collect(Collectors.toList());

        return AttendanceByUser;
    }


    void charChecker(Long userid)
    {
        User user = userRepository.findById(userid).get();

        List<String> AttendanceByUser = attendanceRepository.findByUser(user).stream().map(d->d.getDate()).collect(Collectors.toList());

        ArrayList<Characters> characterArr = (ArrayList<Characters>) characterRepository.findAll();
        Map<Long,Characters> characters = new HashMap<>();
        for (Characters c:characterArr) {
            characters.put(c.getId(),c);
        }

        int AttendanceCount=AttendanceByUser.size();



        long charId=0;
        if(AttendanceCount>0 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
        charId=1;
        if(AttendanceCount>1 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
         charId=2;
        if(AttendanceCount>2 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }

         charId=4;
        if(AttendanceCount>3 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
//         charId=5;
//        if(AttendanceCount>4 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
//        {
//            userCharacterSet(user,charId,characters);
//        }
        charId=6;
        if(AttendanceCount>5 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }
        charId=7;
        if(AttendanceCount>6 && !userCharacterRepository.findByUserAndCharacters(user,characters.get(charId)).isPresent())
        {
            userCharacterSet(user,charId,characters);
        }


    }


    void userCharacterSet(User user, long charId, Map<Long,Characters> characters)
    {
        UserCharacter userCharacter = new UserCharacter();
        userCharacter.setUser(user);
        userCharacter.setCharacters(characters.get(charId));
        userCharacterRepository.save(userCharacter);
        friendSocketService.sendCharacters(user.getId(),(long)charId);
    }
}
