package com.york.api.dto.requests;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.york.api.enums.AppointmentStatus;

import lombok.Data;

@Data
public class AppointmentRescheduleRequest {

    @JsonFormat(pattern = "MM-dd-yyyy")
    private LocalDate date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    private Long patientId;
    private Long slotId;
    private String type;
    private AppointmentStatus status;

}
