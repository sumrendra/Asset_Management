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

To get started with our decentralized asset management system, follow these steps:

1. Install Hardhat as a development dependency:
  ```
  npm install --save-dev hardhat
  ```

2. Once Hardhat is installed, create a new Hardhat project by running:
  ```
  npx hardhat init
  ```

3. To compile the Solidity contracts, run:
  ```
  npx hardhat compile
  ```
4. Start the test node:
  ```
  npx hardhat node
  ```

5. Deploy the Contract:
  ```
  npx hardhat run scripts/deploy.js
  ```




