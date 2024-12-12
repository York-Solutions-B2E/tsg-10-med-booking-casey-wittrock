package com.york.api.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.york.api.dto.responses.AppointmentDTO;
import com.york.api.models.Appointment;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {

    @Mapping(target = "duration", source = "appointment.apptInfo.duration")
    @Mapping(target = "specialization", source = "appointment.apptInfo.doctor.specialization.name")
    @Mapping(target = "time", source = "appointment.apptInfo.time")
    @Mapping(target = "date", source = "appointment.apptInfo.date")
    @Mapping(target = "slotId", source = "appointment.apptInfo.id")
    @Mapping(target = "doctorName", expression = "java(appointment.getApptInfo().getDoctor().getFirstName() + \" \" + appointment.getApptInfo().getDoctor().getLastName())")
    @Mapping(target = "doctorId", source = "appointment.apptInfo.doctor.id")
    @Mapping(target = "patientName", expression = "java(appointment.getPatient().getFirstName() + \" \" + appointment.getPatient().getLastName())")
    AppointmentDTO toDTO(Appointment appointment);

    List<AppointmentDTO> toDTOList(List<Appointment> appointments);

}
