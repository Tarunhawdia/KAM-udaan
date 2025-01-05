# Lead Management API

## Overview

The Lead Management API provides functionality to manage leads, schedule calls, and track interactions. It includes features like adding Points of Contact (POC), scheduling calls across different timezones, and managing interactions.

---

## Features

- Add, update, and retrieve leads.
- Manage Points of Contact (POC) for each lead.
- Schedule calls with timezone support.
- Track interactions (e.g., meetings, calls).
- Automated handling of timezones for accurate scheduling.

---

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL)
- **Libraries**:
  - Mongoose for database interaction
  - date-fns-tz for timezone management

---

## API Endpoints

### Leads

#### Add a Lead

**POST** `/api/leads`

```json
{
  "name": "John Doe",
  "address": "123 Elm Street",
  "status": "new",
  "callFrequency": "daily",
  "nextCallDate": "2024-12-25T10:00:00Z",
  "timezone": "America/New_York"
}
```
