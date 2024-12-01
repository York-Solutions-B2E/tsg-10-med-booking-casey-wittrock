package com.york.api.models;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"user\"")
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String username;
    private String role;
    @ColumnDefault("false")
    private boolean isAdmin;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    @ColumnDefault("null")
    @JsonIgnore
    private Doctor doctorProfile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    @ColumnDefault("null")
    @JsonIgnore
    private Patient patientProfile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    @ColumnDefault("null")
    @JsonIgnore
    private Admin adminProfile;

    public User(String username, String roll, boolean isAdmin, String password) {
        this.username = username;
        this.role = roll;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Object getProfile() {
        if (role.equals("doctor")) {
            return doctorProfile;
        } else if (role.equals("admin")) {
            return adminProfile;
        } else if (role.equals("patient")) {
            return patientProfile;
        } else {
            return null;
        }

    }

}
