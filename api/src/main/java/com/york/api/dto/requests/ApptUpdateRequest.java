package com.york.api.dto.requests;

import com.york.api.enums.AppointmentType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApptUpdateRequest {

    private AppointmentType type;
    private String reason;

}
