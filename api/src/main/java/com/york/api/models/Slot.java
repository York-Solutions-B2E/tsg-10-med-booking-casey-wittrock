package com.york.api.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import com.york.api.enums.SlotDuration;
import com.york.api.enums.SlotStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Slot {

    @SequenceGenerator(name = "slot_sequence", sequenceName = "slot_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "slot_sequence")
    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    private SlotDuration duration;

    @Enumerated(EnumType.STRING)
    private SlotStatus status = SlotStatus.AVAILABLE;

    // @Enumerated(EnumType.STRING)
    // private SlotType type;
    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    private Doctor doctor;

    @OneToMany(mappedBy = "apptInfo", orphanRemoval = false)
    @ColumnDefault("null")
    private List<Appointment> appointments;

    public String getStatusString() {
        return status.toString();
    }
}
