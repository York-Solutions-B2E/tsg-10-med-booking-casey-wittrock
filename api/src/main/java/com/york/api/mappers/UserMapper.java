package com.york.api.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import com.york.api.dto.responses.UserDTO;
import com.york.api.models.User;

@Mapper(componentModel = "spring", uses = {PatientMapper.class})
public abstract class UserMapper {

    @Autowired
    protected PatientMapper patientMapper;

    @Mapping(target = "profile", expression = "java(user.getRoleString().equals(\"PATIENT\")  ? patientMapper.toDTO(user.getPatientProfile()) : user.getProfile())")
    public abstract UserDTO toDTO(User user);

}
