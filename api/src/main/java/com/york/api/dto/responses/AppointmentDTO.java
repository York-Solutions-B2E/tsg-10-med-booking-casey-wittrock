package com.york.api.dto.responses;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.york.api.enums.AppointmentStatus;
import com.york.api.enums.AppointmentType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Long id;
    private Long slotId;
    private String reason;
    private String patientName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    private String doctorName;
    private String specialization;
    private AppointmentType type;
    private String duration;
    private AppointmentStatus status;

}
