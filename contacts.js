const fs = require("fs/promises");
// const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function parsedData() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8", (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
    });
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function listContacts() {
  try {
    const contacts = await parsedData();
    console.table(contacts);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await parsedData();
    const contact = contacts.find(({ id }) => id === contactId);
    console.table(contact);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await parsedData();
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf8"
    );
    console.table(filteredContacts);
  } catch (err) {
    console.log(err.message);
  }
}
async function addContact(name, email, phone) {
  try {
    const contacts = await parsedData();
    const contact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, contact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      "utf8"
    );
    console.table(newContacts);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
