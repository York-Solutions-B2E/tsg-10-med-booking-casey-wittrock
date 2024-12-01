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

import com.york.api.models.Doctor;
import com.york.api.models.Specialization;
import com.york.api.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
    }

    @DeleteMapping("/patient/{id}")
    public void deletePatient(@PathVariable Long id) {
        adminService.deletePatient(id);
    }

    @DeleteMapping("/doctor/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        adminService.deleteDoctor(id);
    }

    @PostMapping("/doctor/{specializationId}/create")
    public Doctor createDoctorAndSetSpecialization(@RequestBody Doctor doctor, @PathVariable Long specializationId) {
        return adminService.createDoctorAndSetSpecialization(doctor, specializationId);
    }

    @DeleteMapping("/specialization/{id}")
    public void deleteSpecialization(@PathVariable Long id) {
        adminService.deleteSpecialization(id);
    }

    @PostMapping("/specialization/create")
    public void createSpecialization(@RequestBody Specialization specialization) {
        adminService.createSpecialization(specialization);
    }

    @DeleteMapping("/appointment/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        adminService.deleteAppointment(id);
    }

    @PutMapping("/doctor/{doctorId}/update")
    public Doctor updateDoctor(@PathVariable Long doctorId, @RequestBody Doctor updateInfo) {
        return adminService.updateDoctor(doctorId, updateInfo);
    }

    @PatchMapping("/doctor/{doctorId}/specialization/{specializationId}")
    public Doctor changeDoctorSpecialization(@PathVariable Long doctorId, @PathVariable Long specializationId) {
        return adminService.changeDoctorSpecialization(doctorId, specializationId);
    }

}
