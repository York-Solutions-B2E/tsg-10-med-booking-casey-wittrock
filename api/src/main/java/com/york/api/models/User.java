package com.york.api.models;

import org.hibernate.annotations.ColumnDefault;

import com.york.api.enums.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "app_user")
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.PATIENT;

    private String oktaId;
    @Column(unique = true)
    private String username;
    private String password;

    @ColumnDefault("null")
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Admin adminProfile;

    @ColumnDefault("null")
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Patient patientProfile;

    public Object getProfile() {
        if (role == UserRole.ADMIN) {
            return adminProfile;
        } else if (role == UserRole.PATIENT) {
            return patientProfile;
        } else {
            return null;
        }
    }

    public String getRoleString() {
        return role.toString();
    }
}
