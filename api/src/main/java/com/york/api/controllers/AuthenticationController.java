package com.york.api.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.models.User;
import com.york.api.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserService userService;

    @Autowired
    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/patient/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser.getPassword().equals(user.getPassword()) && existingUser.getRole().equals("patient")) {
            response.put("message", "Login successful");
            response.put("user", existingUser);
            response.put("profile", existingUser.getProfile());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/patient/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser != null) {
            response.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        } else {
            userService.createUser(user);
            response.put("message", "User created successfully");
            return ResponseEntity.ok().body(response);
        }
    }

    @PostMapping("/doctor/login")
    public ResponseEntity<?> loginDoctor(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser.getPassword().equals(user.getPassword()) && existingUser.getRole().equals("doctor")) {
            response.put("message", "Login successful");
            response.put("user", existingUser);
            response.put("profile", existingUser.getProfile());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existingUser = userService.getUserByUsername(user.getUsername());
        if (existingUser.getPassword().equals(user.getPassword()) && existingUser.getRole().equals("admin")) {
            response.put("message", "Login successful");
            response.put("user", existingUser);
            response.put("profile", existingUser.getProfile());
            return ResponseEntity.ok().body(response);
        } else {
            response.put("message", "Invalid credentials");
            return ResponseEntity.badRequest().body(response);
        }
    }

}
