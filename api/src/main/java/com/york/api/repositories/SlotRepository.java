package com.york.api.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.york.api.models.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    void deleteByIdIn(List<Long> ids);

    @Query("SELECT s FROM Slot s "
            + "WHERE s.doctor.id = :doctorId AND "
            + "(s.date > :currentDate OR (s.date = :currentDate AND s.time > :currentTime))")
    List<Slot> findAvailableFutureSlotsByDoctor(
            @Param("doctorId") Long doctorId,
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime);

}
