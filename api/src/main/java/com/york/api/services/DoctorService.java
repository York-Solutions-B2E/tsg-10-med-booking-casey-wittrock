package com.york.api.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.york.api.dto.responses.DoctorDTO;
import com.york.api.enums.SlotStatus;
import com.york.api.mappers.DoctorMapper;
import com.york.api.mappers.SlotMapper;
import com.york.api.models.Doctor;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.SpecializationRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;
    private final DoctorMapper doctorMapper;
    private final SlotMapper slotMapper;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository,
            DoctorMapper doctorMapper, SlotMapper slotMapper) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
        this.doctorMapper = doctorMapper;
        this.slotMapper = slotMapper;
    }

    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + id + " not found"));
        return doctorMapper.toDTO(doctor);
    }

    @Transactional
    public List<DoctorDTO> getAllDoctors() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        SlotStatus status = SlotStatus.AVAILABLE;
        return doctorMapper.toDTOList(doctorRepository.getAllDoctorsWithAvailableSlots(status, currentDate, currentTime));
    }

    // public List<SlotDTO> getBookedSlots(Long id) {
    //     Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Doctor with id " + id + " not found"));
    //     List<Slot> slots = doctor.getSlots();
    //     List<Slot> bookedSlots = slots.stream().filter(slot -> slot.getStatus() == SlotStatus.BOOKED).toList();
    //     return slotMapper.toDTOList(bookedSlots);
    // }
    // public List<SlotDTO> getDoctorAvailability(Long id) {
    //     Doctor doctor = doctorRepository.findById(id).orElseThrow(()
    //             -> new IllegalArgumentException("Doctor with id " + id + " not found"));
    //     return slotMapper.toDTOList(doctor.getSlots().stream().filter(slot
    //             -> slot.getStatus() == SlotStatus.AVAILABLE).toList());
    // }
    // @Transactional
    // public List<DoctorDTO> getDoctorsBySpecialization(Long specializationId) {
    //     Specialization specialization = specializationRepository.findById(specializationId).orElseThrow(()
    //             -> new IllegalArgumentException("Specialization with id " + specializationId + " not found"));
    //     return doctorMapper.toDTOList(specialization.getDoctors());
    // }
}
