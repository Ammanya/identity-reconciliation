# 📚 Identity Reconciliation Assignment

## 🚀 Introduction
This project implements an identity reconciliation service with a `/identify` endpoint that consolidates and links multiple contact records.

## 📄 Requirements
- Node.js v18+ or higher
- MongoDB (if used as a database)

## ⚡️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-github-repo-link>
   cd <your-repo-folder>
Install dependencies:

bash
Copy
Edit
npm install
Configure environment variables:

Create a .env file in the root directory with the following:

env
Copy
Edit
PORT=3000
MONGO_URI=mongodb://localhost:27017/identity_db
Run the application:

bash
Copy
Edit
npm start
OR for development:

bash
Copy
Edit
npm run dev
Access API on:

bash
Copy
Edit
http://localhost:3000/identify
🎯 API Usage
POST /identify
Request Body:

json
Copy
Edit
{
  "email": "secondary@example.com",
  "phoneNumber": "1234567890"
}
Response:

json
Copy
Edit
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["jane.doe@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
🔎 Test the API using Postman
Import postman_collection.json included in the repo.
