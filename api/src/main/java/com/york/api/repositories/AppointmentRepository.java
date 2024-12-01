package com.york.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.york.api.models.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}
