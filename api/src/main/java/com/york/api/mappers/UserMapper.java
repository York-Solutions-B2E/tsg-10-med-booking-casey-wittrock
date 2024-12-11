package com.york.api.mappers;

import org.mapstruct.Mapper;

import com.york.api.dto.responses.UserDTO;
import com.york.api.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    public abstract UserDTO toDTO(User user);

}
