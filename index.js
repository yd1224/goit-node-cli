import { program } from "commander";
import readline from "readline";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      process.exit();

    case "get":
      if (!id) {
        console.log(
          'To enable "get" action you must provide an id. Please try again.'
        );
        process.exit();
      }
      console.log(await getContactById(id));
      process.exit();

    case "add":
      if (!(email && name && phone)) {
        console.log(
          'To enable "add" action you must provide email, name and phone. Please try again.'
        );
        process.exit();
      }
      console.log(await addContact(name, email, phone));
      process.exit();

    case "remove":
      if (!id) {
        console.log(
          'To enable "remove" action you must provide an id. Please try again.'
        );
        process.exit();
      }
      console.log(await removeContact(id));
      process.exit();

    default:
      console.warn("\x1B[31m Unknown action type!");
      process.exit();
  }
}

invokeAction(options);
