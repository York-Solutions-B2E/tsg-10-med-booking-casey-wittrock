package com.york.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.models.Appointment;
import com.york.api.models.Doctor;
import com.york.api.models.Patient;
import com.york.api.services.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/{id}")
    public Doctor getDoctorProfileById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/{id}/appointments")
    public List<Appointment> getDoctorAppointments(@PathVariable Long id) {
        return doctorService.getDoctorAppointments(id);
    }

    @GetMapping("/{id}/patients")
    public List<Patient> getDoctorPatients(@PathVariable Long id) {
        return doctorService.getDoctorPatients(id);
    }

    @GetMapping("/{specializationId}/doctors")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable Long specializationId) {
        return doctorService.getDoctorsBySpecialization(specializationId);
    }
}
