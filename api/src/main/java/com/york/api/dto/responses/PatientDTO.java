package com.york.api.dto.responses;

import java.time.LocalDate;
import java.util.List;

import com.york.api.enums.PatientGender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {

    private Long id;
    private PatientGender gender;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private LocalDate dob;
    private List<AppointmentDTO> appointments;

}
