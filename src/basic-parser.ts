import * as fs from "fs";
import * as readline from "readline";
import * as z from 'zod'

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 **/

// const directorySchema = z.object(
//   [z.string(), z.coerce.number()]).transform(arr =>({name : arr[0], age : arr[1]})
// )

// export type Person = z.infer<typeof directorySchema>

export async function parseCSV<T>(path: string, Schema? : z.ZodType<T> | undefined): Promise< T[] | string[][]>  {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  let result = []
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!

  const rl_iter = rl[Symbol.asyncIterator]();
  await rl_iter.next() // skip the first line (header)

  if (Schema) {
    for await (const line of rl_iter) {
      const values = line.split(",").map((v) => v.trim());
      
      type resultschema = z.infer<typeof Schema>
      const schema_result: z.ZodSafeParseResult<resultschema> = Schema.safeParse(values) 


      if (!schema_result.success) {
        throw Error("Schema Validation Failed")
      }

      result.push(schema_result.data)
    
    }
    return result}

  else {
    for await (const line of rl_iter) {
    const values = line.split(",").map((v) => v.trim());
    result.push(values)
    }

  }

    return result
  }
// // Notes from Lecture 2

// // async fucntion happens after the sync fucntions do

// async function example() {
//   const result = await parseCSV('something')
// }

// /*

// Name,Credits,Email
// Tim Nelson,10,Tim_Nelson@brown.edu
// Nim Telson,11,MYAWESOMEEMAIL

// */

// // Use this schema as a test case
// const studentRowSchema = z.tuple([z.string(), z.coerce.number(), z.email()])
// .transform(arr => ({name: arr[0], credits: arr[1], email: arr[2]}))