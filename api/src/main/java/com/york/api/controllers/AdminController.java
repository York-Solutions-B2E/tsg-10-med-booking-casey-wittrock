package com.york.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.dto.requests.DoctorRequest;
import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.dto.responses.DoctorDTO;
import com.york.api.dto.responses.SpecializationDTO;
import com.york.api.enums.AppointmentStatus;
import com.york.api.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Admin User Management
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
    }

    // Admin Patient Management
    @DeleteMapping("/patient/{id}")
    public void deletePatient(@PathVariable Long id) {
        adminService.deletePatient(id);
    }

    // Admin Doctor Management
    @DeleteMapping("/doctor/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        adminService.deleteDoctor(id);
    }

    @PutMapping("/doctor/{doctorId}/update")
    public DoctorDTO updateDoctor(@PathVariable Long doctorId, @RequestBody DoctorRequest updateInfo) {
        return adminService.updateDoctor(updateInfo, doctorId);
    }

    @PostMapping("/doctor/create")
    public DoctorDTO createDoctorAndSetSpecialization(@RequestBody DoctorRequest doctorInfo) {
        return adminService.createDoctor(doctorInfo);
    }

    // Admin Specialization Management
    @DeleteMapping("/specialization/{id}")
    public void deleteSpecialization(@PathVariable Long id) {
        adminService.deleteSpecialization(id);
    }

    @PostMapping("/specialization/create/{specialization}")
    public SpecializationDTO createSpecialization(@PathVariable String specialization) {
        return adminService.createSpecialization(specialization);
    }

    // Admin Appointment Management
    @DeleteMapping("/appointment/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        adminService.deleteAppointment(id);
    }

    @PatchMapping("/appointment/{appointmentId}/{status}")
    public AppointmentDTO updateAppointmentStatus(@PathVariable Long appointmentId, @PathVariable AppointmentStatus status) {
        return adminService.updateAppointmentStatus(appointmentId, status);
    }

}
