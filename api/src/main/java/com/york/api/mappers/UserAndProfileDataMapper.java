package com.york.api.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.york.api.dto.responses.UserAndProfileDataDTO;
import com.york.api.models.User;

@Mapper(componentModel = "spring")
public interface UserAndProfileDataMapper {

    @Mapping(target = "profile", expression = "java(user.getProfile())")
    UserAndProfileDataDTO toDTO(User user);

}
