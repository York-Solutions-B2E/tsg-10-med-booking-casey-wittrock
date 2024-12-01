package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.Appointment;
import com.york.api.models.Patient;
import com.york.api.models.User;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.UserRepository;

@Service
public class PatientService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository, AppointmentRepository appointmentRepository, DoctorRepository doctorRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Patient with id " + id + " not found"));
    }

    public Patient createPatientProfile(Patient patient, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()
                -> new IllegalArgumentException("User with id " + userId + " not found"));
        Patient newProfile = patientRepository.save(patient);
        user.setPatientProfile(newProfile);
        userRepository.save(user);
        return patient;
    }

    public Patient updatePatientProfile(Long id, Patient patient) {
        Patient existingPatient = getPatientById(id);
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setDob(patient.getDob());
        existingPatient.setGender(patient.getGender());
        existingPatient.setAddress(patient.getAddress());
        existingPatient.setPhone(patient.getPhone());
        return patientRepository.save(existingPatient);
    }

    public List<Patient> getPatientsByFirstNameAndDob(String firstName, String dob) {
        return patientRepository.findAllByFirstNameAndDob(firstName, dob);
    }

    public Patient createAndSetAppointment(Long patientId, Long doctorId, Appointment appointment) {
        Patient patient = getPatientById(patientId);
        appointment.setDoctor(doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found")));
        appointment.setPatient(patient);
        return patientRepository.save(patient);

    }

    public List<Appointment> getPatientAppointments(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + patientId + " not found"));
        return patient.getAppointments();
    }

}
