package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.york.api.dto.requests.DoctorRequest;
import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.dto.responses.DoctorDTO;
import com.york.api.dto.responses.SlotDTO;
import com.york.api.dto.responses.SpecializationDTO;
import com.york.api.enums.AppointmentStatus;
import com.york.api.mappers.AppointmentMapper;
import com.york.api.mappers.DoctorMapper;
import com.york.api.mappers.SlotMapper;
import com.york.api.mappers.SpecializationMapper;
import com.york.api.models.Appointment;
import com.york.api.models.Doctor;
import com.york.api.models.Slot;
import com.york.api.models.Specialization;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.SlotRepository;
import com.york.api.repositories.SpecializationRepository;
import com.york.api.repositories.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final SpecializationRepository specializationRepository;
    private final AppointmentRepository appointmentRepository;
    private final SlotRepository slotRepository;
    private final DoctorMapper doctorMapper;
    private final SlotMapper slotMapper;
    private final SpecializationMapper specializationMapper;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public AdminService(UserRepository userRepository, DoctorRepository doctorRepository, PatientRepository patientRepository,
            SpecializationRepository specializationRepository, AppointmentRepository appointmentRepository,
            SlotRepository slotRepository, DoctorMapper doctorMapper, SlotMapper slotMapper,
            SpecializationMapper specializationMapper, AppointmentMapper appointmentMapper) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.specializationRepository = specializationRepository;
        this.appointmentRepository = appointmentRepository;
        this.slotRepository = slotRepository;
        this.doctorMapper = doctorMapper;
        this.slotMapper = slotMapper;
        this.specializationMapper = specializationMapper;
        this.appointmentMapper = appointmentMapper;
    }

    // Doctor operations
    @Transactional
    public DoctorDTO createDoctor(DoctorRequest doctorRequest) {
        Doctor newDoctor = doctorMapper.toEntityFromRequest(doctorRequest);
        return doctorMapper.toDTO(doctorRepository.save(newDoctor));
    }

    @Transactional
    public DoctorDTO updateDoctor(DoctorRequest update, Long id) {
        Doctor existingDoctor = doctorRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + id + " not found"));
        Specialization specialization;
        if (update.getSpecializationId().equals(existingDoctor.getSpecialization().getId())) {
            specialization = existingDoctor.getSpecialization();
        } else {
            specialization = specializationRepository.findById(update.getSpecializationId()).orElseThrow(()
                    -> new IllegalArgumentException("Specialization with id " + update.getSpecializationId() + " not found"));
        }
        existingDoctor.setFirstName(update.getFirstName());
        existingDoctor.setLastName(update.getLastName());
        existingDoctor.setAddress(update.getAddress());
        existingDoctor.setPhone(update.getPhone());
        existingDoctor.setEmail(update.getEmail());
        existingDoctor.setSpecialization(specialization);
        // existingDoctor.setBio(update.getBio());
        // existingDoctor.setEducation(update.getEducation());
        // existingDoctor.setProfilePic(update.getProfilePic());
        return doctorMapper.toDTO(doctorRepository.save(existingDoctor));
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    @Transactional
    public List<SlotDTO> addDoctorSlots(Long doctorId, List<Slot> slots) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found"));
        slots.forEach(slot -> {
            slot.setDoctor(doctor);
            doctor.getSlots().add(slot);
        });
        return slotMapper.toDTOList(doctorRepository.save(doctor).getSlots());
    }

    @Transactional
    public List<SlotDTO> removeDoctorSlots(Long doctorId, List<Long> slotIds) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found"));
        List<Slot> slots = doctor.getSlots();
        slots.removeIf(slot -> slotIds.contains(slot.getId()));
        doctor.setSlots(slots);
        slotRepository.deleteByIdIn(slotIds);
        return slotMapper.toDTOList(doctorRepository.save(doctor).getSlots());
    }

    // Specialization operations
    public SpecializationDTO createSpecialization(String specialization) {
        Specialization newSpecialization = new Specialization();
        newSpecialization.setName(specialization);
        return specializationMapper.toDTO(specializationRepository.save(newSpecialization));
    }

    public SpecializationDTO updateSpecialization(Long id, Specialization specialization) {
        Specialization existingSpecialization = specializationRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Specialization with id " + id + " not found"));
        existingSpecialization.setName(specialization.getName());
        return specializationMapper.toDTO(specializationRepository.save(existingSpecialization));
    }

    public void deleteSpecialization(Long id) {
        specializationRepository.deleteById(id);
    }

    // User operations
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Patient operations
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    // Appointment operations
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment existingAppointment = appointmentRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Appointment with id " + id + " not found"));
        existingAppointment.setStatus(status);
        return appointmentMapper.toDTO(appointmentRepository.save(existingAppointment));
    }
}
