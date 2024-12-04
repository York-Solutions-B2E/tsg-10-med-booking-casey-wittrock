package com.york.api.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.dto.responses.PatientDTO;
import com.york.api.mappers.AppointmentMapper;
import com.york.api.mappers.PatientMapper;
import com.york.api.models.Patient;
import com.york.api.models.User;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.UserRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PatientMapper patientMapper;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public PatientService(PatientRepository patientRepository, UserRepository userRepository,
            PatientMapper patientMapper, AppointmentMapper appointmentMapper) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.patientMapper = patientMapper;
        this.appointmentMapper = appointmentMapper;
    }

    @Transactional
    public PatientDTO createPatientProfile(Patient patient, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()
                -> new IllegalArgumentException("User with id " + userId + " not found"));
        Patient newProfile = patientRepository.save(patient);
        user.setPatientProfile(newProfile);
        userRepository.save(user);
        return patientMapper.toDTO(newProfile);
    }

    public PatientDTO getPatientProfileById(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + id + " not found"));

        return patientMapper.toDTO(patient);
    }

    @Transactional
    public PatientDTO getPatientProfileByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()
                -> new IllegalArgumentException("User with id " + userId + " not found"));
        Patient patient = user.getPatientProfile();
        if (patient == null) {
            throw new IllegalArgumentException("Patient profile not found for user with id " + userId);
        }
        return patientMapper.toDTO(patient);
    }

    public List<PatientDTO> getPatientsByLastNameAndDob(String lastName, LocalDate dob) {
        List<Patient> patients
                = patientRepository.findAllByLastNameAndDob(lastName, dob);
        return patientMapper.toDTOList(patients);
    }

    public PatientDTO updatePatientProfile(Long id, Patient patient) {
        Patient existingPatient = patientRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + id + " not found"));
        existingPatient.setFirstName(patient.getFirstName());
        existingPatient.setLastName(patient.getLastName());
        existingPatient.setDob(patient.getDob());
        existingPatient.setGender(patient.getGender());
        existingPatient.setAddress(patient.getAddress());
        existingPatient.setPhone(patient.getPhone());
        return patientMapper.toDTO(patientRepository.save(existingPatient));
    }

    public List<AppointmentDTO> getPatientAppointments(Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + patientId + " not found"));
        return appointmentMapper.toDTOList(patient.getAppointments());
    }
}
