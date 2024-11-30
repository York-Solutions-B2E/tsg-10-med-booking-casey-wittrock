package com.york.api.models;

import org.hibernate.annotations.ColumnDefault;

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
    @ColumnDefault("false")
    private boolean isDoctor;
    private boolean isAdmin;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "doctor_id")
    @ColumnDefault("null")
    private Doctor doctorProfile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_id")
    @ColumnDefault("null")
    private Patient patientProfile;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    @ColumnDefault("null")
    private Admin adminProfile;

    public User(String username, boolean isDoctor, boolean isAdmin, String password) {
        this.username = username;
        this.isDoctor = isDoctor;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    public Object getProfile() {
        if (isDoctor) {
            return doctorProfile;
        } else if (isAdmin) {
            return adminProfile;
        } else {
            return patientProfile;
        }
    }

}
