package com.york.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.dto.requests.ApptUpdateRequest;
import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.models.Appointment;
import com.york.api.services.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create/{patientId}/{slotId}")
    public ResponseEntity<AppointmentDTO> createAppointment(@PathVariable Long patientId, @PathVariable Long slotId, @RequestBody Appointment appt) {
        return ResponseEntity.ok(appointmentService.createAndSetAppointment(patientId, slotId, appt));
    }

    @PatchMapping("/{appointmentId}/cancel")
    public ResponseEntity<AppointmentDTO> cancelAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
    }

    @PatchMapping("/{appointmentId}/reschedule/{slotId}")
    public ResponseEntity<AppointmentDTO> rescheduleAppointment(@PathVariable Long appointmentId, @PathVariable Long slotId) {
        return ResponseEntity.ok(appointmentService.rescheduleAppointment(appointmentId, slotId));
    }

    @PatchMapping("/{appointmentId}/confirm")
    public ResponseEntity<AppointmentDTO> confirmAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.confirmAppointment(appointmentId));
    }

    @PatchMapping("/{apptId}/update")
    public ResponseEntity<AppointmentDTO> updateAppointment(@PathVariable Long apptId, @RequestBody ApptUpdateRequest apptInfo) {
        return ResponseEntity.ok(appointmentService.updateAppointment(apptId, apptInfo));
    }

}
