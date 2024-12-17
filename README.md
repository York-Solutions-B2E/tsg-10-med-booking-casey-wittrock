# Med Booking Application

This project is a medical scheduling application designed to allow users to create and manage appointments seamlessly. The application supports two roles: **Patients** and **Admins**.

## Tech Stack

- **Frontend:** React with Vite
- **Backend:** Java Spring Maven
- **Database:** PostgreSQL
- **Authentication:** Okta

---

## Features

### Patients

- Register for an account (role defaults to Patient).
- Create a patient profile. Access to patient routes is restricted until the profile is set up.
- Book appointments:
  - Choose virtual or in-person appointments.
  - Select a specialty and a doctor in that specialty.
  - Pick from the doctor’s available slots.
  - Provide a reason for the appointment.
- View appointments in a sortable and filterable table:
  - Filter by upcoming, past, canceled, completed, or all appointments.
- Edit appointments:
  - Update the reason and type (virtual or in-person).
  - Reschedule appointments (only with the original doctor).
- Manage appointments:
  - Confirm appointments (within 2 days of the scheduled date).
  - Cancel appointments.

### Admins

- Manage doctor records:
  - Create new doctors.
  - View and edit doctor information.
  - Delete doctor records.

---

## Prerequisites

Ensure the following are installed on your local machine:

1. **Node.js**
2. **JDK** (Java Development Kit)
3. **PostgreSQL**
4. **Okta Account** with appropriate application and credentials set up.

---

## Setup Instructions

### Database Initialization

1. Install and start PostgreSQL.
2. Create a new database for the application.

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Backend Setup

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Configure the database connection and Okta credentials in `application.properties`:

   ```properties
   # Database configuration
   spring.datasource.url=jdbc:postgresql://localhost:5432/<your-database-name>
   spring.datasource.username=<your-database-username>
   spring.datasource.password=<your-database-password>

   # Okta configuration
   okta.oauth2.client-id=<your-okta-client-id>
   okta.oauth2.client-secret=<your-okta-client-secret>
   okta.oauth2.issuer=<your-okta-issuer>
   ```

3. Start the Spring Maven application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Access the Application

Open a web browser and go to:

```
http://localhost:3000
```

---

## Running Notes

- Ensure the PostgreSQL database is running before starting the backend.
- Admin accounts must be manually created in the Okta Dashboard.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/<feature-name>
   ```
3. Commit changes:
   ```bash
   git commit -m "Add <feature-name>"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/<feature-name>
   ```
5. Create a pull request.

---

This project is part of an assessment for York Solution's TSG training program.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
