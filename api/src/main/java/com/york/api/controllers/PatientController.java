package com.york.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<PatientDTO> createPatientProfile(@PathVariable Long userId, @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.createPatientProfile(patient, userId));
    }

    @PutMapping("/update/{patientId}")
    public ResponseEntity<PatientDTO> updatePatientProfile(@PathVariable Long patientId, @RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.updatePatientProfile(patientId, patient));
    }

    // @GetMapping("/{patientId}/appointments")
    // public List<AppointmentDTO> getPatientAppointments(@PathVariable Long patientId) {
    //     return patientService.getPatientAppointments(patientId);
    // }
}
