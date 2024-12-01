package com.york.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.york.api.models.Specialization;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {

    Specialization findByName(String name);

}
