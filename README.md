# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

Proposing Enhancements File

List of Issues with CSV Parser 
 - Functionality:
    - Need to know more information on DSV files with similiar format
    - Need to know what should raise error in the system, and what can be ignored
    
 - Extensibility:
    - Needs to handle spaces
    - Needs to handle comments
    - Needs to handle quotes 
    - Needs to replace missed values with N/A
    - Needs to include headers but have a cool way to display them 

   

- #### Step 2: Use an LLM to help expand your perspective.

    What the LLM said that the parser should have
        - Basic Functionality 
        - Line Ending Support 
        - Handling Empty Fields
        - Delimeter variations
        - Header Row Support
        - Typer Inference and Casting
        - Whitespace handling
        - Error Handling

    - An options interface to make it for developers to determine which features they want to include in the parser(like whitespace trim or delimiter).
    - Auto type casting, to infer if soemthing can be better resprsented by a certain data type

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

   What I came up with:
    List of Issues with CSV Parser 
        - Functionality:

        - Need to know more information on DSV files with similiar format
        - Need to know what should raise error in the system, and what can be ignored

        - Extensibility:

        - Needs to handle spaces
        - Needs to handle comments
        - Needs to handle quotes 
        - Needs to replace missed values with N/A
        - Needs to include headers but have a cool way to display them 

    What the LLM said that the parser should have
        - Basic Functionality 
        - Line Ending Support 
        - Handling Empty Fields
        - Delimeter variations
        - Header Row Support
        - Typer Inference and Casting
        - Whitespace handling
        - Error Handling

    Overall I think that there was a lot of overlap between what I wanted and what the LLM said that I should include when implementing the CSV parser. The LLM made a point about different line endings, which seems to be crucial in ensuring to omit those for the CSV parsing, which I forgot. It did give me extra information about customization stuff, which might have missed the underlying point of finding out what I should include, rather than stuff speicific to what the caller would order.

    I will run some different variations of my prompt through LLMs to see what else they include:

    - An options interface to make it for developers to determine which features they want to include in the parser(like whitespace trim or delimiter).
    - Auto type casting, to infer if soemthing can be better resprsented by a certain data type


    - The top 4 enhancements I think most valuable to explore in the next weeks sprint
        - Enhancements: 
            - Both : Error Handling with misformatted CSV files: Functionality 

                -  As a User of the application, I am able to recieve an error when my csv is misformatted, so I can have a cleaner CSV parse, when the data it correctlty formatted

            - LLM : Handling Quotes: Extensibility

                - As a User of the application, I am able to have feature to preserve commas in a quote, where I dont want the commas to seperate it out, thus ensuring that the correct values pass to the correct values.

            - Both - Header Row Support : Functionallity

                - As a User of the application, I am able to seperate the header row form the csv parse object, and implement it into the schema object, so I can have a cleaner, more structured parse, which makes the data more easily readable
        
        - Edge Cases:
            - Me : Handiling Whitespaces: Extensibility
                
                - As a User of the application, I am able to have extra whitespace trimmed to my specifications, so I can have a cleaner parse return object, without awkard extra spaces interuppting.


### Design Choices

### 1340 Supplement

- #### 1. Correctness
 - A CSVParser needs to handle commas in quotes, needs to throw errors when a file is misformatted, needs to handle whitespace and needs to ignore comment lines and handle line splicing in the middle of a statments, along with the basic fucntionality of splitting on a delimiter. The program should ensure the most accurate parsing of a file.

- #### 2. Random, On-Demand Generation
- With using a randomly generated CSV, I would be able to test for a vairty of different nuances all exitsing in 1 file. This would be a true test for the parser, as the variety of nuances would enlighten if the parse has shortcomings. It would be the ultimate test to see if it can function flawlessly. It would be the ultimate tool to test.

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: 
- In this sprint I encountered a few bugs. The first bug I encountered, were some issues with the undefined type. In order to fix the bug, I went and changed the parse code, to have two differeent for loops, with one for schema, and one if the fucntion didnt have schema, instead of just one for loop. This structure made the code make more sense to me. I also encountered an error where the header column would fail the schema, bevcasue it was the header column. I had to do some research to find out a way to bypass the header column, which allowed the tests to pass,
#### Tests:
- 
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):\
I used generative AI to generate ideas on what a fucntional CSV parser needs, after I had exhausted my ideas. I also used generative AI to help figure out different methods that worked with the readline interface in order to exclude the header row from the schema validation.
#### Total estimated time it took to complete project:
5 Hours 
#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-lsidwell