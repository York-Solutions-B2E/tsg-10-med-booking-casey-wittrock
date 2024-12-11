package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.dto.responses.SpecializationDTO;
import com.york.api.mappers.SpecializationMapper;
import com.york.api.repositories.SpecializationRepository;

@Service

public class SpecializationService {

    private final SpecializationRepository specializationRepository;
    private final SpecializationMapper specializationMapper;

    @Autowired

    public SpecializationService(SpecializationRepository specializationRepository, SpecializationMapper specializationMapper) {
        this.specializationRepository = specializationRepository;
        this.specializationMapper = specializationMapper;
    }

    public List<SpecializationDTO> getAllSpecializations() {
        return specializationMapper.toDTOList(specializationRepository.findAll());
    }

    // public Specialization getSpecializationById(Long id) {
    //     return specializationRepository.findById(id).orElseThrow(()
    //             -> new IllegalArgumentException("Specialization with id " + id + " not found"));
    // }
}
