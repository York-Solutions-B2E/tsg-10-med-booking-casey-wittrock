package com.york.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.models.Appointment;
import com.york.api.models.Patient;
import com.york.api.services.AppointmentService;
import com.york.api.services.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientService patientService;
    private final AppointmentService appointmentService;

    @Autowired
    public PatientController(PatientService patientService, AppointmentService appointmentService) {
        this.patientService = patientService;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/{id}")
    public Patient getPatientProfileById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PostMapping("/create/{userId}")
    public Patient createPatientProfile(@PathVariable Long userId, @RequestBody Patient patient) {
        return patientService.createPatientProfile(patient, userId);
    }

    @PutMapping("/{id}/update")
    public Patient updatePatientProfile(@PathVariable Long id, @RequestBody Patient patient) {
        return patientService.updatePatientProfile(id, patient);
    }

    @GetMapping("/search/{firstName}/{dob}")
    public List<Patient> getPatientsByFirstNameAndDob(@PathVariable String firstName, @PathVariable String dob) {
        return patientService.getPatientsByFirstNameAndDob(firstName, dob);
    }

    @PostMapping("/{patientId}/appointment/{doctorId}")
    public Appointment createAndSetAppointment(@PathVariable Long patientId, @PathVariable Long doctorId, @RequestBody Appointment appt) {
        return appointmentService.createAndSetAppointment(patientId, doctorId, appt);
    }

    @GetMapping("/{patientId}/appointments")
    public List<Appointment> getPatientAppointments(@PathVariable Long patientId) {
        return patientService.getPatientAppointments(patientId);
    }

}
