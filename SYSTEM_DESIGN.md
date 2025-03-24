# 🛠️ SYSTEM DESIGN

## 📊 Architecture Overview
- Microservice-based architecture
- REST API to handle contact reconciliation
- Dockerized for containerization
- Kubernetes for scalable deployment

## 📡 API Design
### Endpoint: `/identify`
- Method: POST
- Request Body:
```json
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
    "emails": ["secondary@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
