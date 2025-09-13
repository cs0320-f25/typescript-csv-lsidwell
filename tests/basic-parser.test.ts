import { asyncWrapProviders } from "async_hooks";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import z, { email } from 'zod'; 

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const SAMPLE_DATA_PATH = path.join(__dirname, "../data/sample_data.csv")
const empty_PATH = path.join(__dirname, "../data/empty.csv")
const missingFields_PATH = path.join(__dirname, "../data/Missing Fields.csv")
const emails_PATH = path.join(__dirname, "../data/emails.csv")

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined);
  
  expect(results).toHaveLength(4);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

/* Tests I want 

  - Basic Functionality
  - Quoted fields
  - trims whitespace
  - comments
  - Empty fields
  - Header Rows
  - Schema???
 */

// Test for basic functionality of parseCSV including all of data
test("parseCSV yields result where all CSV data is included", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH, undefined);

  // Correct number of Rows
  expect(results.length).toEqual(4);
})

// // Test for punctuation
test("parseCSV yields result where punctuation is included", async () => {
  const results = await parseCSV(SAMPLE_DATA_PATH, undefined)

  // Correct way to handle punctuation
  expect(results[5]).toEqual(["Nim", "22:"])
})

// Test for quoated fields with inner commas
test("parse CSV yields result where quotes are not seperated", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH, undefined)

  // Correct way to handle quote with inner comma
  expect(results[2]).toEqual(["Bob", "thirty four"])

})

// Test for trimming whitespace
test("parseCSV yields result where whitespace is trimmed", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH, undefined)

  // Correct way to handle whitespace
  expect(results[3]).toEqual(["Charlie", "25"])
})

// Test for comments
test("parseCSV yields result where comments are ignored", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH, undefined)

  // Correct way to handle comments
  expect(results.length).toEqual(6);
  expect(results[1]).toEqual(["Bob", "34"])
 
})

// Test for empty file 
test("parse CSV yields empty array", async() => {
  const results = await parseCSV(empty_PATH, undefined)

  // Correct way to handle empty file
  expect(results).toEqual([])

})

// // Test for error on empty field 
// test("parse CSV recognizes missing values", async() => {
//   const results = await parseCSV(missingFields_PATH, undefined)

//   // Want to Throw errors for misformatted CSVs
//   expect(results).toThrow();

// })

// Still Need to Test for Schema 

// Name Age Schema Valid

test("parseCSV yeilds reuslt where data results in schema object", async () => {
  const nameAgeSchema = z.tuple([z.string(), z.coerce.number()]).transform(arr => ({name: arr[0], age: arr[1]}))
  const results = await parseCSV(PEOPLE_CSV_PATH, nameAgeSchema)
  
  expect(results[0]).toEqual({name: "Alice", age: 23})
  expect(results[1]).toEqual({name: "Bob", age: 30})
  expect(results[2]).toEqual({name: "Charlie",age: 25})
  expect(results[3]).toEqual({name: "Nim", age: 22})

})

//Missing Fields Schema Invalid
test("parseCSV yeilds reuslt where data results in schema object", async () => {
  const nameAgeSchema = z.tuple([z.string(), z.coerce.number()]).transform(arr => ({name: arr[0], age: arr[1]}))
  await expect(parseCSV(missingFields_PATH, nameAgeSchema)).rejects.toThrow()

})

//StudentRowSchema Valid
test("parseCSV yeilds reuslt where data results in StudentRowSchema", async () => {
  const studentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()]).transform(arr => ({name: arr[0], credits: arr[1], email: arr[2]}))
  const results = await parseCSV(emails_PATH, studentRowSchema)

  expect(results[0]).toEqual({name: "Alice", credits: 23, email: "alice@gmail.com"})
  expect(results[1]).toEqual({name: "Bob", credits: 34, email: "bobby2@gmail.com"})
  expect(results[2]).toEqual({name: "Charlie", credits: 25, email: "chuck5@hotmail.com"})
  expect(results[3]).toEqual({name: "Nim", credits: 22, email: "nimly2@gmail.com"})

})

//Name Email Schema throws error, as data has three field but schema only excepts 2.
test("parse CSV throws error when schema validation fails", async() => {
  const nameemailSchema = z.tuple([z.string(), z.email()]).transform(arr => ({name: arr[0], email: arr[1]}))
  await expect(parseCSV(emails_PATH, nameemailSchema)).rejects.toThrow()
})





