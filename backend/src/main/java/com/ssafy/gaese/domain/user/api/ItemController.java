package com.ssafy.gaese.domain.user.api;

import com.ssafy.gaese.domain.user.application.ItemService;
import com.ssafy.gaese.domain.user.application.UserService;
import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.dto.item.CharacterDto;
import com.ssafy.gaese.domain.user.dto.item.OfficeDto;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/character")
    public ResponseEntity<List<CharacterDto>> getCharacter(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok().body(itemService.getCharacters(user.getId()));
    }

    @GetMapping("/office")
    public ResponseEntity<List<OfficeDto>> getOffice(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok().body(itemService.getOffices(user.getId()));
    }

    @PostMapping("/office/{officeId}")
    public ResponseEntity<List<OfficeDto>> buyOffice(@AuthenticationPrincipal CustomUserDetails user,
                                                     @PathVariable Long officeId) {
        return ResponseEntity.ok().body(itemService.buyOffice(user.getId(),officeId));
    }

    @PostMapping("/character/{officeId}")
    public ResponseEntity<List<CharacterDto>> buyCharacter(@AuthenticationPrincipal CustomUserDetails user,
                                                     @PathVariable Long characterId) {
        return ResponseEntity.ok().body(itemService.buyCharacter(user.getId(),characterId));
    }

}
