# Lead Management API

## Overview

The Lead Management API provides functionality to manage leads, schedule calls, track interactions, and handle Points of Contact (POC) for each lead. This API supports managing leads across different time zones and ensures accurate scheduling for calls and meetings. The system includes features for adding, updating, retrieving leads, managing POCs, and tracking lead performance.

## System Requirements

- Node.js (v16.x or higher)
- MongoDB (v6.0 or higher)
- TypeScript (v5.7.2 or higher)
- npm (v8.x or higher)

## Running Instructions

### Development Mode

Run the application in development mode with hot-reloading:

```bash
npm run dev
```

The server will start on http://localhost:3000 (or the port specified in your .env file)

### Production Mode

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

### Available Scripts

- `npm run build`: Compiles TypeScript code to JavaScript
- `npm start`: Runs the compiled application
- `npm run dev`: Runs the application in development mode with hot-reloading

## Features

- **Leads Management**: Add, update, and retrieve leads.
- **Points of Contact (POC)**: Manage POCs for each lead.
- **Scheduling Calls**: Schedule calls with timezone support, ensuring accurate scheduling across different time zones.
- **Interactions Tracking**: Track lead interactions (e.g., meetings, calls).
- **Performance Tracking**: Track and categorize leads based on their performance.
- **Timezone Support**: Automated handling of timezones for accurate scheduling.

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL)
- **Libraries**:

  - **Mongoose** for database interaction

## API Endpoints

### Leads

#### Add a Lead

**POST** /api/leads/add

Adds a new lead to the system with details like name, address, status, call frequency, and timezone.

**Request Body**

```json
{
  "name": "John Doe",
  "address": "123 Elm Street",
  "status": "new",
  "callFrequency": "daily"
}
```

#### Get Leads for Today

**GET** /api/leads/calls-today

Fetches all leads that require a call today, considering time zones.

#### Track Lead Performance

**GET** /api/leads/performance

Tracks and categorizes leads based on performance, such as well-performing and underperforming leads.

#### Get All Leads

**GET** /api/leads

Fetches all leads in the system.

### Points of Contact (POC)

#### Add POC to a Lead

**POST** /api/poc/:leadId

Adds a Point of Contact (POC) to an existing lead by its ID.

**Request Body**:

```
json
{
  "name": "Jane Smith",
"role": "Sales Manager",
 "email": "janesmith@example.com",
  "phone": "+1234567890"
 }
```

#### Get POCs for a Lead

**GET** /api/poc/:leadId

Fetches all Points of Contact (POC) associated with a specific lead.

#### Update POC

**PUT** /api/poc/:id

Updates the details of an existing Point of Contact (POC).

#### Delete POC

**DELETE** /api/poc/:id

Deletes a Point of Contact (POC) from the system.

### Interactions

#### Add Interaction

**POST** /api/interactions/add

Adds an interaction (e.g., call, meeting) for a lead.

**Request Body**:

```
json
{
"leadId": "60d21b4667d0d8992e610c85",
"interactionType": "call",
    "interactionDate": "2024-12-25T10:00:00Z",
 "notes": "Discussed the product's features"
}
```

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A **MongoDB** instance running (either locally or remotely).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/lead-management-api.git
   cd lead-management-api
   npm install
   ```
2. Env setup
   ```env
   MONGO_URI=your_mongo_database_url
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

The API will be running at http://localhost:5000.

## Error Handling

All errors are handled by the errorHandler middleware, which catches errors thrown during the request cycle and returns appropriate HTTP status codes and error messages.

```

```
