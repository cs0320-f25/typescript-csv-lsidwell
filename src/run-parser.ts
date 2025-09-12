import { parseCSV } from "./basic-parser";
import z from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name
const emails_PATH = "./data/emails.csv";

const nameAgeSchema = z.tuple([z.string(), z.coerce.number()]).transform(arr => ({name: arr[0], age: arr[1]}))
const studentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()]).transform(arr => ({name: arr[0], credits: arr[1], email: arr[2]}))

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(emails_PATH, studentRowSchema);

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();