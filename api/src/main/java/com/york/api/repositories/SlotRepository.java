package com.york.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.york.api.models.Slot;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    void deleteByIdIn(List<Long> ids);
}
