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

import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.dto.responses.PatientDTO;
import com.york.api.models.Patient;
import com.york.api.services.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // @GetMapping("/{id}")
    // public PatientDTO getPatientProfileById(@PathVariable Long id) {
    //     return patientService.getPatientProfileById(id);
    // }
    @PostMapping("/create/{userId}")
    public PatientDTO createPatientProfile(@PathVariable Long userId, @RequestBody Patient patient) {
        return patientService.createPatientProfile(patient, userId);
    }

    @PutMapping("/{id}/update")
    public PatientDTO updatePatientProfile(@PathVariable Long id, @RequestBody Patient patient) {
        return patientService.updatePatientProfile(id, patient);
    }

    @GetMapping("/{patientId}/appointments")
    public List<AppointmentDTO> getPatientAppointments(@PathVariable Long patientId) {
        return patientService.getPatientAppointments(patientId);
    }

}
