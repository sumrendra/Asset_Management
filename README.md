# Decentralized Asset Management System

Our decentralized asset management system is designed to provide enhanced transparency, improved auditing, and compliance for managing assets on the blockchain. The system leverages the power of blockchain technology to ensure secure, immutable, and auditable records of asset transactions.

## Roles

We are starting with four key roles, with the potential to add a fifth role in the future:

### 1. SuperAdmin
- **Responsibilities**: 
  - Provisioning users to groups.
  - Managing overall system access.
  
### 2. Purchasing Team
- **Responsibilities**: 
  - Provisioning new assets.
  - Ensuring proper entry of assets into the system.
  
### 3. Maintenance Team
- **Responsibilities**: 
  - Handling maintenance-related activities.
  - Updating asset status accordingly.
  
### 4. Auditor
- **Responsibilities**: 
  - Reviewing records.
  - Ensuring compliance and accuracy of transactions.

### Future Role: Vendor
- **Responsibilities**: 
  - Managing vendor-specific transactions.
  - Handling interactions within the system.

## Technology Stack

To build our decentralized asset management system, we are using the following technologies:

### Frontend: **React**
  - Powerful for building dynamic, responsive user interfaces.
  - Perfect for managing the various role-based consoles.
  - Easy to implement and maintain.

### Backend: **Express.js**
  - Efficiently handles server-side logic and API requests.
  - Lightweight and flexible.
  - Integrates well with other parts of our stack.

### Database: **PostgreSQL**
  - Offers advanced features and better concurrency handling.
  - Ideal for managing complex data.

### Blockchain: **Ethereum**
  - Ensures transparency and security in asset records and transactions.
  - Best choice for handling on-chain data in our system.

## Getting Started

Follow these steps to set up and run the Decentralized Asset Management System:

### 1. Clone the Repository

```bash
git clone https://github.com/sumrendra/Asset_Management.git
cd Asset_Management
```

### 2. Install Dependencies

Install Hardhat :

```bash
npm install hardhat
```

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Deploy Smart Contracts

Navigate to the root directory and deploy the smart contracts using Hardhat:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Run the Backend Server

Start the backend (Express.js) server:

```bash
cd backend
node server.js
```

### 6. Run the Frontend App

Start the frontend (React) app:

```bash
cd ../frontend
npm start
```

### 7. Access the App

Once both the backend and frontend are running, open your browser and navigate to:

```
http://localhost:3000
```

This will load the Decentralized Asset Management System's frontend, where you can interact with the system.


