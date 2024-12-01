package com.york.api.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
public class Patient {

    @Id
    @SequenceGenerator(name = "patient_sequence", sequenceName = "patient_sequence", allocationSize = 1)
    @Generated(value = "patient_sequence")
    private Long id;
    private String gender;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String dob;

    // @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    // @JsonIgnore
    // private List<Message> messages;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments;

    @ManyToMany
    @JoinTable(
            name = "patient_doctor",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    @JsonIgnore
    private List<Doctor> doctors;

    public Patient(String firstName, String lastName, String email, String phone, String address, String dob, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.dob = dob;
        this.gender = gender;
    }

    public Patient(String firstName, String lastName, String dob, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
    }

}
