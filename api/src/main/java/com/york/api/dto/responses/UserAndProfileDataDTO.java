package com.york.api.dto.responses;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAndProfileDataDTO {

    UserDTO user;
    Object profile;
    List<AppointmentDTO> appointments;
}
