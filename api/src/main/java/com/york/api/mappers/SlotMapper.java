package com.york.api.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.york.api.dto.responses.SlotDTO;
import com.york.api.models.Slot;

@Mapper(componentModel = "spring")
public interface SlotMapper {

    SlotDTO toDTO(Slot slot);

    List<SlotDTO> toDTOList(List<Slot> slots);

}
