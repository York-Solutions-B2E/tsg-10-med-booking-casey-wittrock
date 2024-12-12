import axios from "axios";

const BASE_URL = "/api";

/**
 * API Class to make calls to the backend API.
 *
 * Use async functions and await the methods of this class to get the response data.
 * @method login(data) - Login a user and returns the user data, profile, and appointments if user is a patient.
 * @method registerPatient(data) - Create a new patient user and returns the new user instance.
 * @method createProfile(userId, data) - Create a patient profile and returns the new profile instance.
 * @method updatedPatientProfile(patientId, data) - Update a patient profile and returns the updated profile instance.
 * @method getPatientAppointments(patientId) - Get all appointments for a patient.
 * @method cancelAppointment(appointmentId) - Cancel an appointment.
 * @method getAppointment(appointmentId) - Get an appointment.
 * @method createAppointment(patientId, slotId, data) - Create an appointment.
 * @method confirmAppointment(appointmentId) - Confirm an appointment.
 * @method markAppointmentAsCompleted(appointmentId) - Mark an appointment as completed.
 * @method markAsNoShow(appointmentId) - Mark an appointment as no show.
 *
 */

class MedBookingApi {
  static token;
  /**
   * @typedef {id: number} UserObject
   */
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
   *
   * The XSRF-TOKEN cookie should be passed as the token.
   * @param {String} token
   */
  static async setToken(token) {
    this.token = token;
  }

  //Authentication API

  /**
   * Sends a request to authenticate the cookie token
   * and returns the user data, profile, and appointments
   * if user is a patient. If the user is not in the database yet,
   * the user will be created with the okta user data.
   *
   * @returns {Promise<{
   *  user: UserObject,
   *  profile: ProfileObject,
   *  appointments: [...ApptObjects]
   *  }>} {user: {UserObject}, profile: {ProfileObject}, appointments: [apptObj1, apptObj2, ...]}
   */
  static async authenticate() {
    return await this.request("/auth/user", "post");
  }

  /**
   * Login a user and returns the user data, profile, and appointments if user is a patient.
   * If user is an admin, appointments will always be empty.
   *
   * Use async function and await this method to get the user data.
   * @param {{username: String, password: String}} data {username: String, password: String}
   * @returns {Promise<{user: UserObject, profile: ProfileObject, appointments: [...ApptObjects]}>} {user: {UserObject}, profile: {ProfileObject}, appointments: [apptObj1, apptObj2, ...]}
   */
  static async login(data) {
    return await this.request(`/auth/login`, "post", data);
  }

  static async logout() {
    return await this.request(`/auth/logout`, "post");
  }

  //Patient API

  /**
   * Create a patient profile and returns the new profile instance.
   *
   * Use async function and await this method to get the new profile instance.
   * @param {Number} userId
   * @param {{
   *  gender: String,
   *  firstName: String,
   *  lastName: String,
   *  dob: String
   *  email: String,
   *  phone: String,
   *  address: String
   *  }} data
   * @returns {Promise<ProfileObject>} {ProfileObject}
   */
  static async createProfile(userId, data) {
    return await this.request(`/patient/create/${userId}`, "post", data);
  }

  /**
   * Update a patient profile and returns the updated profile instance.
   *
   * Use async function and await this method to get the updated profile instance.
   * @param {Number} patientId
   * @param {{
   *  firstName: String,
   *  lastName: String,
   *  gender: String,
   *  dob: String,
   *  email: String,
   *  phone: String,
   *  address: String
   *  }} data
   * @returns {Promise<ProfileObject>} {ProfileObject}
   */
  static async updatedPatientProfile(patientId, data) {
    return await this.request(`/patient/update/${patientId}`, "put", data);
  }

  /**
   * Get a list of all appointments for a patient.
   *
   * Use async function and await this method to get the list of appointments.
   * @param {Number} patientId
   * @returns {Promise<[...ApptObjects]>} [apptObj1, apptObj2, ...]
   */
  static async getPatientAppointments(patientId) {
    return await this.request(`/patient/${patientId}/appointments`);
  }

  // Appointment API

  /**
   * Get an appointment by appointmentId.
   *
   * Use async function and await this method to get the appointment instance.
   * @param {Number} appointmentId
   * @returns {Promise<ApptObject>} {ApptObject}
   */
  static async getAppointment(appointmentId) {
    return await this.request(`/appointment/${appointmentId}`);
  }

  /**
   * Create a new appointment.
   *
   * Use async function and await this method to get the new appointment instance.
   * @param {Number} patientId
   * @param {Number} slotId
   * @param {{reason: String, type: String}} data
   * @returns
   */
  static async createAppointment(patientId, slotId, data) {
    return await this.request(
      `/appointment/create/${patientId}/${slotId}`,
      "post",
      data
    );
  }

  /**
   * Update an appointment by appointmentId.
   *
   * Use async function and await this method to update the appointment
   * @param {Number} appointmentId
   * @param {{reason: String, type: String}} data {reason: String, type: String}
   * @returns
   */
  static async updateAppointment(appointmentId, data) {
    return await this.request(
      `/appointment/${appointmentId}/update`,
      "patch",
      data
    );
  }

  /**
   * Confirm an appointment by appointmentId.
   *
   * Use async function and await this method to confirm the appointment
   * @param {Number} appointmentId
   * @returns
   */
  static async confirmAppointment(appointmentId) {
    return await this.request(`/appointment/${appointmentId}/confirm`, "patch");
  }

  /**
   * Cancel an appointment by appointmentId.
   *
   * Use async function and await this method to cancel the appointment.
   * @param {Number} appointmentId
   * @returns
   */
  static async cancelAppointment(appointmentId) {
    return await this.request(`/appointment/${appointmentId}/cancel`, "patch");
  }

  /**
   * Reschedule an appointment by appointmentId and slotId.
   *
   * Use async function and await this method to reschedule the appointment.
   * @param {Number} appointmentId
   * @param {Number} slotId
   * @returns {Promise<ApptObject>} {ApptObject}
   */
  static async rescheduleAppointment(appointmentId, slotId) {
    return await this.request(
      `/appointment/${appointmentId}/reschedule/${slotId}`,
      "patch"
    );
  }

  // Doctor API

  /**
   * Get the profile of a doctor by doctorId.
   *
   * Use async function and await this method to get the doctor profile.
   * @param {Number} doctorId
   * @returns
   */
  static getDoctorProfile(doctorId) {
    return this.request(`/doctor/${doctorId}`);
  }

  /**
   * Get all doctors.
   *
   * Use async function and await this method to get all doctors.
   * @returns {[...DoctorObjects]} [doctorObj1, doctorObj2, ...]
   */
  static getDoctors() {
    return this.request(`/doctor/all`);
  }

  // Specializations API

  /**
   * Get all specializations.
   *
   * Use async function and await this method to get all specializations.
   * @returns {[...SpecializationObjects]} [specializationObj1, specializationObj2, ...]
   */
  static getSpecializations() {
    return this.request(`/specialization/all`);
  }

  // Admin API

  static createDoctor(data) {
    return this.request(`/admin/doctor/create`, "post", data);
  }

  static updateDoctor(doctorId, data) {
    return this.request(`/admin/doctor/update/${doctorId}`, "put", data);
  }

  static updateDoctorSchedule(doctorId, data) {
    return this.request(`/admin/doctor/${doctorId}/schedule`, "patch", data);
  }

  static async markAsNoShow(appointmentId) {
    return await this.request(`/appointment/${appointmentId}/no-show`, "patch");
  }

  static async markAppointmentAsCompleted(appointmentId) {
    return await this.request(
      `/appointment/${appointmentId}/completed`,
      "patch"
    );
  }
}

export default MedBookingApi;
