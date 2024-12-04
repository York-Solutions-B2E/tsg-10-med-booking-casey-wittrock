package com.york.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.dto.requests.AuthenticationRequest;
import com.york.api.dto.responses.UserDTO;
import com.york.api.mappers.UserMapper;
import com.york.api.models.User;
import com.york.api.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO login(AuthenticationRequest loginInfo) {
        User user = userRepository.findByUsernameAndPassword(loginInfo.getUsername(), loginInfo.getPassword()).orElseThrow(()
                -> new RuntimeException("No user found with the provided credentials"));
        return userMapper.toDTO(user);
    }

    public UserDTO register(AuthenticationRequest registerInfo) {
        User user = new User();
        user.setUsername(registerInfo.getUsername());
        user.setPassword(registerInfo.getPassword());
        return userMapper.toDTO(userRepository.save(user));
    }

    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new RuntimeException("User with username " + username + " not found"));
        return userMapper.toDTO(user);
    }

    public UserDTO getUserByOktaId(String oktaId) {
        User user = userRepository.findByOktaId(oktaId).orElseThrow(()
                -> new RuntimeException("User with Okta ID " + oktaId + " not found"));
        return userMapper.toDTO(user);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(()
                -> new RuntimeException("User with ID " + id + " not found"));
        return userMapper.toDTO(user);
    }

    public UserDTO createUser(User user) {
        return userMapper.toDTO(userRepository.save(user));
    }
}
