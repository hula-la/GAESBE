package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.Attendance;
import com.ssafy.gaese.domain.user.entity.User;
import org.joda.time.LocalDate;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {

    boolean existsByUserAndDate(User user, LocalDate date);
}
