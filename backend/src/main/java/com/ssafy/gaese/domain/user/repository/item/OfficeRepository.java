package com.ssafy.gaese.domain.user.repository.item;

import com.ssafy.gaese.domain.user.entity.item.Office;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office,Long> {

}
