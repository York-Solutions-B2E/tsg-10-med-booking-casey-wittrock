package com.york.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.york.api.models.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
