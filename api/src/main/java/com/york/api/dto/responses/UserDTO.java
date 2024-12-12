package com.york.api.dto.responses;

import com.york.api.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String oktaId;
    private UserRole role;
    private String firstName;
    private String lastName;

}
