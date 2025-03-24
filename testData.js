const db = require("./models");
const Contact = db.Contact;

async function addTestData() {
  await Contact.create({
    email: "jane.doe@example.com",
    phoneNumber: "1234567890",
    linkPrecedence: "primary",
    linkedId: null,
  });
  console.log("✅ Test data inserted successfully!");
}

addTestData();
