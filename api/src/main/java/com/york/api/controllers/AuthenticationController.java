package com.york.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.dto.responses.UserAndProfileDataDTO;
import com.york.api.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class AuthenticationController {

    private final ClientRegistration registration;
    private final UserService userService;

    @Autowired
    public AuthenticationController(ClientRegistrationRepository registrations, UserService userService) {
        this.registration = registrations.findByRegistrationId("okta");
        this.userService = userService;
    }

    @PostMapping("api/auth/user")
    public ResponseEntity<UserAndProfileDataDTO> getOrCreateUser(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(userService.getOrCreateUser(user));
    }

    @GetMapping("/")
    public ResponseEntity<?> redirectToFrontend(HttpServletResponse response) {
        response.setHeader("Location", "http://localhost:3000/");
        return ResponseEntity.status(HttpStatus.FOUND).build();
    }

    @PostMapping("api/auth/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {
        response.setHeader("Location", registration.getProviderDetails().getConfigurationMetadata()
                .get("end_session_endpoint").toString());
        request.getSession().invalidate();
        return ResponseEntity.status(HttpStatus.FOUND).build();
    }
}
