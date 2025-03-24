
📚 Identity Reconciliation Microservice


This project implements a microservice that reconciles contact information across multiple sources. It exposes a /identify endpoint that processes incoming contact details (email and phone number) and consolidates them into a unified profile.

⚡️ Key Features


✅ Identity Consolidation: Merges multiple contacts and updates precedence.

✅ Contact Matching: Identifies matching records based on email or phoneNumber.

✅ Primary & Secondary Linking: Links new records to primary contacts dynamically.

✅ Efficient Database Queries: Optimized operations to minimize query overhead.

🛠️ Tech Stack


Backend: Node.js, Express.js

Database: MongoDB (Optional if persistence is enabled)

Containerization: Docker (Optional if deployed in containers)

CI/CD: GitHub Actions/Jenkins (Optional for automated deployment)


📦 Prerequisites

1.Node.js v18+

2.MongoDB (Optional if database persistence is enabled)

3.Postman for testing API



🚀 Setup Instructions


1. 📥 Clone the Repository


        git clone https://github.com/Ammanya/identity-reconciliation.git


        cd identity-reconciliation


2. 📚 Install Dependencies

        npm install

   
3. ⚙️ Configure Environment Variables
   
      Create a .env file in the root directory with the following:


       PORT=3000
       MONGO_URI=mongodb://localhost:27017/identity_db
   
4. ▶️ Run the Application
   
       For production:

       npm start
For development (with nodemon):


        npm run dev

        
🌐 API Endpoints


➡️ POST /identify


📥 Request Body

      {
            "email": "secondary@example.com",
             "phoneNumber": "1234567890"
       }
       
📤 Sample Response
 
      {
              "contact": {
               "primaryContactId": 1,
                "emails": ["jane.doe@example.com", "secondary@example.com"],
               "phoneNumbers": ["1234567890"],
                "secondaryContactIds": []
       }
}


🧪 Test the API Using Postman


   Import the postman_collection.json file included in the repo.

    Test the /identify endpoint with different request payloads.




🛑 Troubleshooting
Port in use? Change the PORT value in .env.

MongoDB Connection Issues? Check MONGO_URI configuration.

🎥 CI/CD Pipeline
GitHub Actions: .github/workflows/deploy.yml automates the deployment pipeline.


.

