# Trade-X

Trade-X is a full-stack web application inspired by a stock trading and brokerage experience. It combines a public-facing landing website with an authenticated dashboard where users can view holdings, positions, orders, funds, and transactions.

This project was built as a learning and portfolio-style application. Some parts of the implementation were developed with help from AI 
## Project Overview

Trade-X is divided into three main parts:

- Frontend: the public website for marketing and account access
- Dashboard: the authenticated trading dashboard UI
- Backend: the API layer for authentication, portfolio data, orders, and transactions

The goal of the project is to simulate the experience of a modern trading platform in a simplified form, rather than to provide a production-grade brokerage system.

## Main Features

- User signup and login
- JWT-based authentication
- Portfolio-style holdings view
- Active positions view
- Order history
- Fund deposit and withdrawal flow
- Transaction history
- Live-like stock price display
- Responsive UI built with React and Material UI

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Material UI
- Emotion
- Axios

### Dashboard

- React
- Vite
- React Router
- Material UI
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- nodemon

## Project Structure

```text
Trade-X/
├── backend/
│   ├── index.js
│   ├── clean-and-seed.js
│   ├── package.json
│   ├── model/
│   ├── schemas/
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── Dashboard/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## How the App Works

### 1. Public Website

The frontend app serves the landing pages such as home, pricing, products, support, login, and signup.

### 2. Authentication Flow

Users can create an account or log in. The backend validates the login details, hashes the password with bcrypt, and issues a JWT token for authenticated requests.

### 3. Dashboard Experience

Once the user is authenticated, the dashboard loads portfolio-related information such as:

- holdings
- positions
- orders
- funds
- transactions

### 4. Live Price Display

The dashboard shows stock prices through a backend endpoint that fetches market information from Yahoo Finance. The backend processes the response and sends it to the React dashboard, where it is displayed in the UI.

Please note that this is a demo-style implementation. The live-price feature is not a full financial data service and may behave differently depending on network availability or API response changes.

## Database Design

The backend uses MongoDB with Mongoose schemas for:

- users
- holdings
- positions
- orders
- transactions

The main backend logic is in the file [backend/index.js](backend/index.js), and the data models are stored in the [backend/model](backend/model) and [backend/schemas](backend/schemas) folders.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB running locally or a reachable MongoDB URI

### 1. Clone the project

```bash
git clone <repo-url>
cd Trade-X
```

### 2. Install dependencies

Install dependencies for each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../Dashboard
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the backend folder with values like:

```env
MONGO_URL=mongodb://127.0.0.1:27017/tradex
PORT=8080
JWT_SECRET=your_secret_key
```

If your MongoDB setup is different, update the connection string accordingly.

### 4. Seed demo data (optional but recommended)

The repository includes a seed script to create a demo user and prepare the database state.

```bash
cd backend
node clean-and-seed.js
```

This will create a demo user with:

- Email: demo@example.com
- Password: demopassword

### 5. Run the apps

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend website:

```bash
cd frontend
npm run dev
```

Run the dashboard:

```bash
cd Dashboard
npm run dev
```

### Default ports

- Frontend: http://localhost:3000
- Dashboard: http://localhost:3001
- Backend: http://localhost:8080

## Notes About the Current State

This project is functional as a demo and learning project, but it has some limitations:

- It is not a production-grade financial platform
- The live stock price feature depends on external API availability
- Some UI parts are simplified for demonstration purposes
- Authentication and order logic are implemented in a basic but workable way

## Honest Note About AI Assistance

This project was developed with a mix of personal effort and assistance from AI tools. Some parts were challenging, especially around:

- React routing and component organization
- backend API structure
- authentication flow
- integrating frontend and backend data flow
- debugging errors and improving code structure

AI support helped speed up development and solve several implementation difficulties, but the project still reflects a hands-on learning process and a real effort to build a working application.

## Future Improvements

Possible improvements for the project include:

- better authentication and user management
- proper order execution logic with real market integration
- improved UI/UX polish
- better error handling and validations
- testing coverage
- deployment setup
- more realistic portfolio calculations

## License

This project is currently for educational and demonstration purposes.

## Contact

If you want to discuss this project or improve it further, feel free to reach out through the repository or project owner contact details.
