package com.york.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.Appointment;
import com.york.api.repositories.AppointmentRepository;
import com.york.api.repositories.DoctorRepository;
import com.york.api.repositories.PatientRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository, PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Appointment with id " + id + " not found"));
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long id) {
        Appointment existingAppointment = getAppointmentById(id);
        existingAppointment.setCancelled(true);
        return appointmentRepository.save(existingAppointment);
    }

    public Appointment rescheduleAppointment(Long id, Appointment appointment) {
        Appointment existingAppointment = getAppointmentById(id);
        existingAppointment.setDate(appointment.getDate());
        existingAppointment.setTime(appointment.getTime());
        return appointmentRepository.save(existingAppointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existingAppointment = getAppointmentById(id);
        existingAppointment.setDate(appointment.getDate());
        existingAppointment.setTime(appointment.getTime());
        existingAppointment.setConfirmed(appointment.isConfirmed());
        existingAppointment.setCancelled(appointment.isCancelled());
        existingAppointment.setCompleted(appointment.isCompleted());
        existingAppointment.setNotesRead(appointment.isNotesRead());
        existingAppointment.setNotes(appointment.getNotes());
        return appointmentRepository.save(existingAppointment);
    }

    public Appointment createAndSetAppointment(Long patientId, Long doctorId, Appointment appointment) {
        appointment.setDoctor(doctorRepository.findById(doctorId).orElseThrow(()
                -> new IllegalArgumentException("Doctor with id " + doctorId + " not found")));
        appointment.setPatient(patientRepository.findById(patientId).orElseThrow(()
                -> new IllegalArgumentException("Patient with id " + patientId + " not found")));
        return appointmentRepository.save(appointment);
    }

    public Appointment setNotes(Long id, String notes) {
        Appointment existingAppointment = getAppointmentById(id);
        existingAppointment.setNotes(notes);
        existingAppointment.setNotesRead(false);
        return appointmentRepository.save(existingAppointment);
    }

    public Appointment markNotesRead(Long id) {
        Appointment existingAppointment = getAppointmentById(id);
        existingAppointment.setNotesRead(true);
        return appointmentRepository.save(existingAppointment);
    }
}
