package com.york.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.york.api.dto.responses.UserAndProfileDataDTO;
import com.york.api.dto.responses.UserDTO;
import com.york.api.enums.UserRole;
import com.york.api.mappers.AppointmentMapper;
import com.york.api.mappers.PatientMapper;
import com.york.api.mappers.UserMapper;
import com.york.api.models.User;
import com.york.api.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AppointmentMapper appointmentMapper;
    private final PatientMapper patientMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, AppointmentMapper appointmentMapper,
            PatientMapper patientMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.appointmentMapper = appointmentMapper;
        this.patientMapper = patientMapper;
    }

    public UserAndProfileDataDTO getOrCreateUser(OAuth2User user) {
        String oktaId = user.getAttribute("sub");
        System.out.println(user.getAttributes());
        User existingUser = userRepository.findByOktaId(oktaId).orElseGet(()
                -> userRepository.save(new User(user.getAttribute("preferred_username"), user.getAttribute("sub"))));
        UserAndProfileDataDTO data = new UserAndProfileDataDTO();
        UserDTO userData = userMapper.toDTO(existingUser);
        userData.setFirstName(user.getAttribute("given_name"));
        userData.setLastName(user.getAttribute("family_name"));
        data.setUser(userData);
        if (existingUser.getRole().equals(UserRole.PATIENT)) {
            if (existingUser.getPatientProfile() != null) {
                data.setProfile(patientMapper.toDTO(existingUser.getPatientProfile()));
                data.setAppointments(appointmentMapper.toDTOList(existingUser.getPatientProfile().getAppointments()));
            } else {
                data.setProfile(null);
                data.setAppointments(null);
            }

        } else if (existingUser.getRole().equals(UserRole.ADMIN)) {
            data.setProfile(existingUser.getAdminProfile());
            data.setAppointments(null);
        } else {
            data.setProfile(null);
            data.setAppointments(null);
        }
        return data;
    }

}
