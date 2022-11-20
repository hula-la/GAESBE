package com.ssafy.gaese.security.application;

import com.ssafy.gaese.domain.user.entity.Ability;
import com.ssafy.gaese.domain.user.entity.AuthProvider;
import com.ssafy.gaese.domain.user.entity.User;
import com.ssafy.gaese.domain.user.entity.UserRole;
import com.ssafy.gaese.domain.user.entity.item.Characters;
import com.ssafy.gaese.domain.user.entity.item.Office;
import com.ssafy.gaese.domain.user.entity.item.UserCharacter;
import com.ssafy.gaese.domain.user.entity.item.UserOffice;
import com.ssafy.gaese.domain.user.repository.AbilityRepository;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.domain.user.repository.item.CharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.OfficeRepository;
import com.ssafy.gaese.domain.user.repository.item.UserCharacterRepository;
import com.ssafy.gaese.domain.user.repository.item.UserOfficeRepository;
import com.ssafy.gaese.security.error.OAuthProcessingException;
import com.ssafy.gaese.security.model.CustomUserDetails;
import com.ssafy.gaese.security.model.account.OAuth2UserInfo;
import com.ssafy.gaese.security.util.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

//OAuth2UserRequest에 있는 Access Token으로 유저정보를 얻음
// 획득한 유저 정보를 process()에서 provider과 attribute로 Java Model과 맵핑하고 가입 되지 않은 경우와 이미 가입된 경우를 구분하여 프로세스 진행
// 결과로 OAuth2User를 구현한 CustomUserDetails 객체를 생성

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final UserCharacterRepository userCharacterRepository;
    private final UserOfficeRepository userOfficeRepository;
    private final CharacterRepository characterRepository;
    private final OfficeRepository officeRepository;

    private final AbilityRepository abilityRepository;

    // OAuth2UserRequest에 있는 Access Token으로 유저정보 get
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        return process(oAuth2UserRequest, oAuth2User);
    }

    // 획득한 유저정보를 Java Model과 맵핑하고 프로세스 진행
    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        System.out.println("**********");
        System.out.println(userInfo);
        System.out.println("**********");

        if (userInfo.getId().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }
        Optional<User> userOptional = userRepository.findBySocialIdAndAuthProvider(userInfo.getId(), userInfo.getAuthProvider());
        User user;

        if (userOptional.isPresent()) {		// 이미 가입된 경우
            user = userOptional.get();
            if (authProvider != user.getAuthProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }

        } else {			// 가입되지 않은 경우
            user = createUser(userInfo, authProvider);
        }
        return CustomUserDetails.create(user, oAuth2User.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = User.builder()
                .socialId(userInfo.getId())
                .img(userInfo.getImageUrl())
                .userRole(UserRole.USER)
                .authProvider(authProvider)
                .build();

        User save = userRepository.save(user);


        Characters characters = characterRepository.findById(0L).orElseThrow(()->new RuntimeException("캐릭터X"));
        Office office = officeRepository.findById(1L).orElseThrow(() -> new RuntimeException("오피스X"));

        userCharacterRepository.save(UserCharacter.builder()
                .characters(characters)
                .user(save)
                .build());

        userOfficeRepository.save(UserOffice.builder()
                .office(office)
                .user(save)
                .build());


        System.out.println("회원가입 중");
        abilityRepository.save(Ability.builder()
                        .user(save)
                .build());


        return save;
    }
}