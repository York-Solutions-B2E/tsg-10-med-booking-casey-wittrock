package com.york.api.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Doctor {

    @Id
    @SequenceGenerator(name = "doctor_sequence", sequenceName = "doctor_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctor_sequence")
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    // @OneToMany(mappedBy = "doctor")
    // @JsonIgnore
    // private List<Message> messages;
    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Appointment> appointments;

}
