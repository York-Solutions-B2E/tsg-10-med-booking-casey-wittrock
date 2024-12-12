package com.york.api.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.york.api.dto.responses.UserDTO;
import com.york.api.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "firstName", ignore = true)
    @Mapping(target = "lastName", ignore = true)
    public abstract UserDTO toDTO(User user);

}
