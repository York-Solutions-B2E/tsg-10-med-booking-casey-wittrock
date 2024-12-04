package com.york.api.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.york.api.dto.responses.SpecializationDTO;
import com.york.api.models.Specialization;

@Mapper(componentModel = "spring")
public interface SpecializationMapper {

    SpecializationDTO toDTO(Specialization specialization);

    List<SpecializationDTO> toDTOList(List<Specialization> specializations);

    // Specialization toEntity(SpecializationDTO specializationDTO);
}
