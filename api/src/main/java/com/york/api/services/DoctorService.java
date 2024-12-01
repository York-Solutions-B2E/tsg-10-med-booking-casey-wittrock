package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.Appointment;
import com.york.api.models.Doctor;
import com.york.api.models.Patient;
import com.york.api.models.Specialization;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.SpecializationRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final SpecializationRepository specializationRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, PatientRepository patientRepository, AppointmentRepository appointmentRepository, SpecializationRepository specializationRepository) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.specializationRepository = specializationRepository;
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Doctor with id " + id + " not found"));
    }

    public List<Patient> getDoctorPatients(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + id + " not found"));
        return doctor.getPatients();
    }

    public List<Appointment> getDoctorAppointments(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + id + " not found"));
        return doctor.getAppointments();
    }

    public Doctor updateDoctorProfile(Long id, Doctor doctor) {
        Doctor existingDoctor = doctorRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + id + " not found"));
        existingDoctor.setFirstName(doctor.getFirstName());
        existingDoctor.setLastName(doctor.getLastName());
        existingDoctor.setAddress(doctor.getAddress());
        existingDoctor.setPhone(doctor.getPhone());
        return doctorRepository.save(existingDoctor);
    }

    public List<Doctor> getDoctorsBySpecialization(Long specializationId) {
        Specialization specialization = specializationRepository.findById(specializationId).orElseThrow(()
                -> new IllegalArgumentException("Specialization with id " + specializationId + " not found"));
        return specialization.getDoctors();
    }

}
