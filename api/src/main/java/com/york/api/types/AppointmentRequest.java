package com.york.api.types;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AppointmentRequest {

    private Long doctorId;
    private Long patientId;
    private String appointmentDate;

}
