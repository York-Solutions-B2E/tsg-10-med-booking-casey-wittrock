package com.york.api.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Specialization {

    @Id
    @SequenceGenerator(name = "specialization_sequence", sequenceName = "specialization_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "specialization_sequence")
    private Long id;
    private String name;

    @OneToMany(mappedBy = "specialization", orphanRemoval = false)
    private List<Doctor> doctors;

}
