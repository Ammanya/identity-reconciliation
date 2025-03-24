const { Op } = require("sequelize");
const { Contact } = require("../models");

// POST /identify - Identity Reconciliation Endpoint
const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  // ✅ Validate input
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Email or Phone Number required" });
  }

  try {
    // ✅ Find contacts with matching email or phoneNumber
    const contact = await Contact.findAll({
      where: {
        [Op.or]: [
          email ? { email: email } : {},
          phoneNumber ? { phoneNumber: phoneNumber } : {},
        ],
      },
    });

    // ✅ If no matching contacts, create a new primary contact
    if (contact.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "primary",
      });

      // Return newly created primary contact
      return res.status(201).json({
        contact: formatContactResponse(newContact, []),
      });
    }

    // ✅ Identify the primary contact
    let primaryContact = contact.find((c) => c.linkPrecedence === "primary");

    // ✅ If no primary contact found, make the first one primary
    if (!primaryContact) {
      primaryContact = contact[0];
      await primaryContact.update({ linkPrecedence: "primary" });
    }

    // ✅ Get all secondary contacts linked to the primary contact
    let secondaryContacts = contact.filter(
      (c) =>
        c.linkPrecedence === "secondary" && c.linkedId === primaryContact.id
    );

    // ✅ Check if a new secondary contact should be created
    const contactExists = contact.some(
      (c) =>
        (email && c.email === email) ||
        (phoneNumber && c.phoneNumber === phoneNumber)
    );

    // ✅ Create a secondary contact if it does not exist
    if (!contactExists) {
      const newContactData = {
        email,
        phoneNumber,
        linkPrecedence: "secondary",
        linkedId: primaryContact.id,
      };

      // Create only if one of the fields is not null
      if (email || phoneNumber) {
        const newContact = await Contact.create(newContactData);
        secondaryContacts.push(newContact);
      }
    }

    // ✅ Return consolidated contact information
    return res.status(200).json({
      contact: formatContactResponse(primaryContact, secondaryContacts),
    });
  } catch (error) {
    console.error("❌ Error identifying contact:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Helper function to format the response
function formatContactResponse(primaryContact, secondaryContacts) {
  // Avoid duplicates in emails and phone numbers
  const uniqueEmails = [
    primaryContact.email,
    ...secondaryContacts.map((c) => c.email),
  ]
    .filter(Boolean) // Remove null/undefined
    .filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

  const uniquePhoneNumbers = [
    primaryContact.phoneNumber,
    ...secondaryContacts.map((c) => c.phoneNumber),
  ]
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    primaryContactId: primaryContact.id,
    emails: uniqueEmails,
    phoneNumbers: uniquePhoneNumbers,
    secondaryContactIds: secondaryContacts.map((c) => c.id),
  };
}

module.exports = { identifyContact };
