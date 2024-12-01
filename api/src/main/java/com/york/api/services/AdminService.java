package com.york.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.Doctor;
import com.york.api.models.Specialization;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.SpecializationRepository;
import com.york.api.repositories.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final SpecializationRepository specializationRepository;
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AdminService(UserRepository userRepository, DoctorRepository doctorRepository, PatientRepository patientRepository, SpecializationRepository specializationRepository, AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.specializationRepository = specializationRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public void deleteSpecialization(Long id) {
        specializationRepository.deleteById(id);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Doctor createDoctorAndSetSpecialization(Doctor doctor, Long specializationId) {
        Specialization specialization = specializationRepository.findById(specializationId).orElseThrow(()
                -> new IllegalArgumentException("Specialization with id " + specializationId + " not found"));
        doctor.setSpecialization(specialization);
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long doctorId, Doctor updateInfo) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found"));
        doctor.setFirstName(updateInfo.getFirstName());
        doctor.setLastName(updateInfo.getLastName());
        doctor.setEmail(updateInfo.getEmail());
        doctor.setPhone(updateInfo.getPhone());
        doctor.setAddress(updateInfo.getAddress());
        return doctorRepository.save(doctor);
    }

    public Doctor changeDoctorSpecialization(Long doctorId, Long specializationId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found"));
        Specialization specialization = specializationRepository.findById(specializationId).orElseThrow(()
                -> new IllegalArgumentException("Specialization with id " + specializationId + " not found"));
        doctor.setSpecialization(specialization);
        return doctorRepository.save(doctor);
    }

    public Doctor removePatientFromDoctor(Long doctorId, Long patientId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found"));
        doctor.getPatients().removeIf(patient -> patient.getId().equals(patientId));
        return doctorRepository.save(doctor);
    }

    public Specialization createSpecialization(Specialization specialization) {
        return specializationRepository.save(specialization);
    }

}
