package com.york.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.york.api.models.Specialization;
import com.york.api.services.SpecializationService;

@RestController
@RequestMapping("/api/specialization")
public class SpecializationController {

    private final SpecializationService specializationService;

    @Autowired
    public SpecializationController(SpecializationService specializationService) {
        this.specializationService = specializationService;
    }

    @GetMapping("/all")
    public List<Specialization> getAllSpecializations() {
        return specializationService.getAllSpecializations();
    }

}
