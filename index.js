const Manager = require("./assets/lib/Manager");
const Engineer = require("./assets/lib/Engineer");
const Intern = require("./assets/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./assets/src/page-template");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let employees = [];

// Function to manage team
function teamManager() {
    // Prompt for manager's name, id, and email
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter your name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter your id:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter your email:"
        },
    ]).then(answers => {
        // Create new manager object
        let manager = new teamManager(answers.name, answers.id, answers.email);
        // Add manager to employees array
        employees.push(teamManager);
    });
}
// Function to add an engineer
function addEngineer() {
    // Prompt for engineer's details
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter engineer's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter engineer's id:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter engineer's email:"
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter engineer's GitHub username:"
        }
    ]).then(answers => {
        // Create new enigneer object
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // Add engineer to employees array
        employees.push(engineer);
    });
}
// Function to add an intern
function addIntern() {
    // Prompt for intern's details
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter intern's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter intern's id:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter intern's email:"
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter intern's school:"
        }
    ]).then(answers => {
        // Create new intern object
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        // Add intern to employees array
        employees.push(intern);
    });
}
// This function will print the employees array to the console
function finishBuildingTeam() {
    console.log(employees);
}
// Check if an error occurred
fs.writeFile(outputPath, html, err => {
    if (err) {
        // Log error message
        console.error('Error saving HTML to file:', err);
    } else {
        // Log success message
        console.log('HTML saved to team.html');
    }
});
