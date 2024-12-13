import axios from "axios";
const BASE_URL = "/api";

class AdminApi {
  static token;

  /**
   * Request method to make a call to the backend API.
   *
   * This method should be called by other methods in the class only.
   *
   * Use async function and await this method to get the response data.
   * @param {String} endpoint
   * @param {String} method - default is "get"
   * @param {{}} data {RequestData} - default is empty {}
   * @returns {Promise<ResponseDataObject>} {ResponseData}
   */
  static async request(endpoint, method = "get", data = {}) {
    console.debug("API Call:", endpoint, data, method);
    console.log(this.token);
    const url = `${BASE_URL}${endpoint}`;
    const headers = this.token ? { "X-XSRF-TOKEN": this.token } : {};
    console.log(headers);
    try {
      return (
        await axios({ url, method, data, headers, withCredentials: true })
      ).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // API initialization

  /**
   * Set the static token property for the API class to
   * be used in all API calls.
   * @param {String} token
   */
  static async setToken(token) {
    this.token = token;
  }

  // Doctor Admin API

  /**
   * Get all the doctors in the database.
   * @returns {Promise<[DoctorObject]>} [doctor1, doctor2, ...]
   */
  static async getDoctors() {
    return await this.request(`/doctor/all`);
  }

  /**
   * Get a doctor's information.
   * @param {Number} doctorId
   * @returns {Promise<DoctorObject>} {DoctorObject}
   */
  static async getDoctor(doctorId) {
    return await this.request(`/doctor/${doctorId}`);
  }

  /**
   * Update a doctor's information.
   * @param {Number} doctorId
   * @param {{
   *    firstName: String,
   *    lastName: String,
   *    email: String,
   *    phone: String
   *   specializationId: Number
   *    }} doctorData
   * @returns {Promise<DoctorObject>} {DoctorObject}
   */
  static async updateDoctor(doctorId, doctorData) {
    return await this.request(
      `/admin/doctor/${doctorId}/update`,
      "put",
      doctorData
    );
  }

  /**
   * Delete a doctor from the database.
   * @param {Number} doctorId
   * @returns {Promise<{message: String}>} {message: "Doctor deleted"}
   */
  static async deleteDoctor(doctorId) {
    return await this.request(`/admin/doctor/${doctorId}/delete`, "delete");
  }

  /**
   * Create a new doctor in the database.
   * @param {{
   *   firstName: String,
   *  lastName: String,
   * email: String,
   * phone: String,
   * specializationId: Number
   * }} doctorData
   * @returns {Promise<DoctorObject>} {DoctorObject}
   */
  static async createDoctor(doctorData) {
    return await this.request(`/admin/doctor/create`, "post", doctorData);
  }

  // Specialization Admin API

  /**
   * Get all the specializations in the database.
   * @returns {Promise<[SpecializationObject]>} [specialization1, specialization2, ...]
   */
  static async getSpecializations() {
    return await this.request(`/specialization/all`);
  }

  /**
   * Add a new specialization to the database.
   * @param {String} name
   */
  static async createSpecialization(name) {
    return await this.request(`/admin/specializations/create`, "post", {
      name,
    });
  }

  /**
   * Delete a specialization from the database.
   * @param {Number} specializationId
   */
  static async deleteSpecialization(specializationId) {
    return await this.request(
      `/admin/specializations/${specializationId}/delete`,
      "delete"
    );
  }

  // Patient Appointment Admin API

  /**
   * Get patients by last name and date of birth.
   * @param {String} lastName
   * @param {String} dob
   * @returns {Promise<[PatientObject]>} [patient1, patient2, ...]
   */
  static async getPatientsByLastNameAndDob(lastName, dob) {
    return await this.request(`/admin/patients/${lastName}/${dob}`);
  }

  /**
   * Get a patient's appointments.
   * @param {Number} patientId
   * @returns {Promise<[ApptObject]>} [appt1, appt2, ...]
   */
  static async getPatientAppointments(patientId) {
    return await this.request(`/admin/patients/${patientId}/appointments`);
  }
}

export default AdminApi;
