package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import org.joda.time.LocalDate;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    boolean existsByUserAndDate(User user, String date);

    List<Attendance> findByUser(User user);

}
