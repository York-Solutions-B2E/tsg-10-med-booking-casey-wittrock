package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.enums.AppointmentStatus;
import com.york.api.enums.SlotStatus;
import com.york.api.mappers.AppointmentMapper;
import com.york.api.models.Appointment;
import com.york.api.models.Slot;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;
import com.york.api.repositories.SlotRepository;

import jakarta.transaction.Transactional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final SlotRepository slotRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository,
            SlotRepository slotRepository, DoctorRepository doctorRepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.slotRepository = slotRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentMapper = appointmentMapper;
    }

//     public AppointmentDTO getAppointmentById(Long id) {
//         Appointment appt = appointmentRepository.findById(id).orElseThrow(()
//                 -> new IllegalArgumentException("Appointment with id " + id + " not found"));
//         return appointmentMapper.toDTO(appt);
//     }
    @Transactional
    public AppointmentDTO cancelAppointment(Long id) {
        Appointment existingAppointment = appointmentRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Appointment with id " + id + " not found"));
        existingAppointment.setStatus(AppointmentStatus.CANCELED);
        Slot slot = existingAppointment.getApptInfo();
        slot.setStatus(SlotStatus.AVAILABLE);
        slotRepository.save(slot);
        existingAppointment.setApptInfo(null);
        return appointmentMapper.toDTO(appointmentRepository.save(existingAppointment));
    }

    public AppointmentDTO confirmAppointment(Long id) {
        Appointment existingAppointment = appointmentRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("Appointment with id " + id + " not found"));
        existingAppointment.setStatus(AppointmentStatus.CONFIRMED);
        return appointmentMapper.toDTO(appointmentRepository.save(existingAppointment));
    }

    @Transactional
    public AppointmentDTO rescheduleAppointment(Long apptId, Long slotId) {
        Appointment existingAppointment = appointmentRepository.findById(apptId).orElseThrow(()
                -> new IllegalArgumentException("Appointment with id " + apptId + " not found"));
        Slot newSlot = slotRepository.findById(slotId).orElseThrow(()
                -> new IllegalArgumentException("Slot with id " + slotId + " not found"));
        Slot oldSlot = existingAppointment.getApptInfo();
        oldSlot.setStatus(SlotStatus.AVAILABLE);
        existingAppointment.setApptInfo(newSlot);
        newSlot.setStatus(SlotStatus.BOOKED);
        slotRepository.saveAll(List.of(oldSlot, newSlot));
        return appointmentMapper.toDTO(appointmentRepository.save(existingAppointment));
    }

    @Transactional
    public AppointmentDTO createAndSetAppointment(Long patientId, Long slotId, Appointment appointment) {
        Slot slot = slotRepository.findById(slotId).orElseThrow(()
                -> new IllegalArgumentException("Slot with id " + slotId + " not found"));
        appointment.setApptInfo(slot);
        slot.setStatus(SlotStatus.BOOKED);
        slotRepository.save(slot);
        appointment.setPatient(patientRepository.findById(patientId).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + patientId + " not found")));
        return appointmentMapper.toDTO(appointmentRepository.save(appointment));
    }

}
