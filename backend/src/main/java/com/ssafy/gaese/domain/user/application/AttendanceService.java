package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.exception.UserNotFoundException;
import com.ssafy.gaese.domain.user.repository.AttendanceRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    public boolean attendanceCheck(Long userId, LocalDate date){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException());
        attendanceRepository.existsByUserAndDate(user, date);

        Attendance attendance = Attendance.builder()
                .date(date)
                .user(user)
                .build();

        attendanceRepository.save(attendance);
        return true;
    }

}
