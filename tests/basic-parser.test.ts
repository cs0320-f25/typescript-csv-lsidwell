import { asyncWrapProviders } from "async_hooks";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import z from 'zod'; 

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const SAMPLE_DATA_PATH = path.join(__dirname, "../data/sample_data.csv")
const empty_PATH = path.join(__dirname, "../data/empty.csv")
const missingFields_PATH = path.join(__dirname, "../data/Missing Fields.csv")

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
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
  const results = await parseCSV(SAMPLE_DATA_PATH);

  // Correct number of Rows
  expect(results.length).toEqual(5);

  for (const row of results) {
    // Correct number of comma seperated values in each row
    expect(row.length).toEqual(2);}
})

// // Test for punctuation
test("parseCSV yields result where punctuation is included", async () => {
  const results = await parseCSV(SAMPLE_DATA_PATH)

  // Correct way to handle punctuation
  expect(results[4]).toEqual(["Nim", "22:"])
})

// Test for quoated fields with inner commas
test("parse CSV yields result where quotes are not seperated", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH)

  // Correct way to handle quote with inner comma
  expect(results[1]).toEqual(["Bob", "thirty four"])

})

// Test for trimming whitespace
test("parseCSV yields result where whitespace is preserved", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH)

  // Correct way to handle whitespace
  expect(results[3]).toEqual(["Charlie", "25"])
})

// Test for comments
test("parseCSV yields result where comments are ignored", async() => {
  const results = await parseCSV(SAMPLE_DATA_PATH)

  // Correct way to handle comments
  expect(results.length).toEqual(5);
  expect(results[2]).toEqual(["Bob", "34"])
 
})

// Test for empty file 
test("parse CSV yields empty array", async() => {
  const results = await parseCSV(empty_PATH)

  // Correct way to handle empty file
  expect(results).toEqual([])

})

// Test for error on empty field 
test("parse CSV recognizes missing values", async() => {
  const results = await parseCSV(missingFields_PATH)

  // Want to Throw errors for misformatted CSVs
  expect(results).toThrow();

})

// Test for header
test("parse CSV recognizes missing values", async() => {
  const results = await parseCSV(missingFields_PATH)

  // Correct way to handle empty field
  expect(results[0]).toEqual(["name", "age"])

})


// Still Need to Test for Schema 






// test("parseCSV yeilds reuslt where data results in schema object", async () => {
//   const results = await parseCSV(SAMPLE_DATA_PATH)
//   const nameAgeSchema = z.tuple([z.string(), z.coerce.number()]).transform(arr => ({name: arr[0], credits: arr[1]}))

//   expect results


// })


