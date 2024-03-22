import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const parsedRes = JSON.parse(readResult);
    return parsedRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getContactById(contactId) {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find((contact) => contact.id === contactId);
    const result = contact ? contact : null;
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsArr = await listContacts();
    const contacts = contactsArr.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    deletedContact = await getContactById(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}
removeContact("_AlTZnp15DDLYm22kqN5i");
async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const userObj = await listContacts();
    const newUserObj = { id, name, email, phone };
    userObj.push(newUserObj);
    await fs.writeFile(contactsPath, JSON.stringify(userObj));
    return newUserObj;
  } catch (error) {
    console.log(error);
  }
}
