package com.york.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.york.api.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findAllByFirstNameAndDob(String firstName, String dob);
}
