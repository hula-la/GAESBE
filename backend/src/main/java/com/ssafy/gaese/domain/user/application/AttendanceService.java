package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.AlreadyCheckException;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AttendanceRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

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
        return true;
    }

    public List<String> getAttendance(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());

        List<String> AttendanceByUser = attendanceRepository.findByUser(user).stream().map(d->d.getDate()).collect(Collectors.toList());

        return AttendanceByUser;
    }

}
