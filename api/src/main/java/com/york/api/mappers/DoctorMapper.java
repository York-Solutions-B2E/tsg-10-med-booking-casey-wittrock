package com.york.api.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.york.api.dto.requests.DoctorRequest;
import com.york.api.dto.responses.DoctorDTO;
import com.york.api.models.Doctor;

@Mapper(componentModel = "spring", uses = {SlotMapper.class, SpecializationMapper.class})
public interface DoctorMapper {

    @Mapping(target = "specializationId", source = "doctor.specialization.id")
    @Mapping(target = "specialization", source = "doctor.specialization.name")
    public abstract DoctorDTO toDTO(Doctor doctor);

    public abstract List<DoctorDTO> toDTOList(List<Doctor> doctors);

    @Mapping(target = "specialization", ignore = true)
    @Mapping(target = "slots", ignore = true)
    public abstract Doctor toEntity(DoctorDTO dto);

    public abstract Doctor toEntityFromRequest(DoctorRequest request);

}
