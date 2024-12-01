package com.york.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.User;
import com.york.api.repositories.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()
                -> new RuntimeException("User with username " + username + " not found"));
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

}
