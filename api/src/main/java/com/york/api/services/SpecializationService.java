package com.york.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.york.api.models.Specialization;
import com.york.api.repositories.SpecializationRepository;

@Service

public class SpecializationService {

    private final SpecializationRepository specializationRepository;

    @Autowired
    public SpecializationService(SpecializationRepository specializationRepository) {
        this.specializationRepository = specializationRepository;
    }

    public List<Specialization> getAllSpecializations() {
        return specializationRepository.findAll();
    }

    public Specialization getSpecializationById(Long id) {
        return specializationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Specialization with id " + id + " not found"));
    }

}
