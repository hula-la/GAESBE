package com.ssafy.gaese.domain.typing.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    @GetMapping("/test")
    public ResponseEntity<String> test() throws Exception {
        System.out.println("aaaaaaa\n\n\n\n\n");
        return new ResponseEntity<String>("test", HttpStatus.OK);
    }
}
