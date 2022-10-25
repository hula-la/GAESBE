package com.ssafy.gaese.domain.user.application;

import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Component("userDetailsService")
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email) {
        // DB에서 유저정보와 권한정보를 가져온다
        return userRepository.findByEmail(email)
                .map(user -> createUser(user))
                .orElseThrow(() -> new UsernameNotFoundException(email + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(User user) {

        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
        log.info("grantedAuthority : " + grantedAuthority);

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getSocialId(),
                Collections.singleton(grantedAuthority)
                );
    }
}
