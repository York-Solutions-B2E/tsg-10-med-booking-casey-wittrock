package com.york.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.dto.responses.DoctorDTO;
import com.york.api.services.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorProfileById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    // @GetMapping("/{specializationId}/doctors")
    // public List<DoctorDTO> getDoctorsBySpecialization(@PathVariable Long specializationId) {
    //     return doctorService.getDoctorsBySpecialization(specializationId);
    // }
    // @GetMapping("/{doctorId}/availability")
    // public List<SlotDTO> getDoctorAvailability(@PathVariable Long doctorId) {
    //     return doctorService.getDoctorAvailability(doctorId);
    // }
}
