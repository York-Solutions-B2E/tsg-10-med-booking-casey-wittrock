package com.york.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.dto.requests.AuthenticationRequest;
import com.york.api.dto.responses.UserDTO;
import com.york.api.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody AuthenticationRequest loginInfo) {
        return ResponseEntity.ok(userService.login(loginInfo));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody AuthenticationRequest registerInfo) {
        return ResponseEntity.ok(userService.register(registerInfo));
    }

}
