package com.york.api.repositories;

import com.york.api.models.Patient;

public interface PatientRepository {

    Patient findByFirstNameAndDob(String firstName, String dob);
}
