// Import required modules
const Manager = require("./assets/lib/Manager");
const Engineer = require("./assets/lib/Engineer");
const Intern = require("./assets/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Define the output directory and path
const outputDirectory = path.resolve(__dirname, "output");
const outputPath = path.join(outputDirectory, "team.html");

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Import the page template
const render = require("./assets/src/page-template");

// Initialize the team array
const team = [];

// Define the function to input manager data
function inputManagerData() {
  // Prompt the user for manager data
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Manager's name?",
        validate: (val) => /^[a-zA-Z]+$/g.test(val), // Validate the name input
      },
      {
        type: "input",
        name: "id",
        message: "What is the Manager's employee ID?",
        validate: (val) => /^[1-9]+$/.test(val), // Validate the ID input
      },
      {
        type: "input",
        name: "email",
        message: "What is the Manager's email address?",
        validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Validate the email input
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?",
        validate: (val) => /^[1-9]+$/.test(val), // Validate the office number input
      },
    ])
    .then((managerData) => {
      // Create a new Manager object with the input data
      const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );
      // Add the new Manager object to the team array
      team.push(newManager);
      // Call the menu function
      menu();
    });
}

// Define the function to display the menu
function menu() {
  // Prompt the user to choose an option
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "teamMembers",
        message: "Please, choose from the following options:",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((answer) => {
      // Get the selected options
      const selectedAnswer = answer.teamMembers;

      if (selectedAnswer.length === 0) {
        console.log("You did not select any option.");
        // Call the menu function recursively
        menu();
      } else if (selectedAnswer.includes("Add an engineer")) {
        inputEngineerData();
      } else if (selectedAnswer.includes("Add an intern")) {
        inputInternData();
      } else if (selectedAnswer.includes("Finish building the team")) {
        finish();
      }
    });
}

// Define the function to input engineer data
function inputEngineerData() {
  // Prompt the user for engineer data
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
        validate: (val) => /^[a-zA-Z]+$/g.test(val), // Validate the name input
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's employee ID?",
        validate: (val) => /^[1-9]+$/.test(val), // Validate the ID input
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?",
        validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Validate the email input
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?",
        validate: (val) => /^[a-zA-Z0-9]+$/.test(val), // Validate the GitHub input
      },
    ])
    .then((engineerData) => {
      // Create a new Engineer object with the input data
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );
      // Add the new Engineer object to the team array
      team.push(newEngineer);
      // Call the menu function
      menu();
    });
}

// Define the function to input intern data
function inputInternData() {
  // Prompt the user for intern data
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        validate: (val) => /^[a-zA-Z]+$/g.test(val), // Validate the name input
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's employee ID?",
        validate: (val) => /^[1-9]+$/.test(val), // Validate the ID input
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email address?",
        validate: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Validate the email input
      },
      {
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?",
        validate: (val) => /^[a-zA-Z0-9]+$/.test(val), // Validate the school input
      },
    ])
    .then((internData) => {
      // Create a new Intern object with the input data
      const newIntern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
      );
      // Add the new Intern object to the team array
      team.push(newIntern);
      // Call the menu function
      menu();
    });
}

// Define the function to generate the HTML content and write it to a file
function finish() {
  // Generate the HTML content using the render function
  const htmlContent = render(team);

  // Write the HTML content to a file
  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("HTML file is ready: " + outputPath);
    }
    // Exit the process
    process.exit(0);
  });
}

// Call the inputManagerData function to start the application
inputManagerData();