package com.york.api.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.york.api.enums.SlotStatus;
import com.york.api.models.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query("SELECT DISTINCT d FROM Doctor d "
            + "LEFT JOIN FETCH d.slots s "
            + "WHERE (s IS NULL OR (s.status = :status AND "
            + "(s.date > :currentDate OR (s.date = :currentDate AND s.time > :currentTime)))) "
            + "ORDER BY s.date ASC, s.time ASC")
    List<Doctor> getAllDoctorsWithAvailableSlots(
            @Param("status") SlotStatus status,
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime);

    @Query("SELECT DISTINCT d FROM Doctor d "
            + "LEFT JOIN FETCH d.slots s "
            + "WHERE (s IS NULL OR (s.date > :currentDate OR (s.date = :currentDate AND "
            + "s.time > :currentTime))) "
            + "ORDER BY s.date ASC, s.time ASC")
    List<Doctor> getAllDoctorsWithAllFutureSlots(
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime);

}
