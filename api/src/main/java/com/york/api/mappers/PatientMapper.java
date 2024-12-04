package com.york.api.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.york.api.dto.responses.PatientDTO;
import com.york.api.models.Patient;

@Mapper(componentModel = "spring", uses = {AppointmentMapper.class})
public interface PatientMapper {

    public abstract PatientDTO toDTO(Patient patient);

    public abstract List<PatientDTO> toDTOList(List<Patient> patients);

}
