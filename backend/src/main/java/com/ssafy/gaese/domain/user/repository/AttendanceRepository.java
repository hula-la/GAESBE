package com.ssafy.gaese.domain.user.repository;

import com.ssafy.gaese.domain.user.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
}
