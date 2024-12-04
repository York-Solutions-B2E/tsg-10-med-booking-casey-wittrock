package com.york.api.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private Long specializationId;
}
