const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamMembers = [];

const promptManager = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter the manager's name:",
                validate: (input) => (input ? true : "Name can't be empty!"),
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the manager's employee ID:",
                validate: (input) => (input ? true : "ID can't be empty!"),
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the manager's email address:",
                validate: (input) => (input ? true : "Email can't be empty!"),
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Enter the manager's office number:",
                validate: (input) => (input ? true : "Office number can't be empty!"),
            },
        ]);

        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);

        console.log(`Manager ${answers.name} added to the team.`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const promptEngineer = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter the engineer's name:",
                validate: (input) => (input ? true : "Name can't be empty!"),
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the engineer's employee ID:",
                validate: (input) => (input ? true : "ID can't be empty!"),
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the engineer's email address:",
                validate: (input) => (input ? true : "Email can't be empty!"),
            },
            {
                type: 'input',
                name: 'github',
                message: "Enter the engineer's GitHub username:",
                validate: (input) => (input ? true : "GitHub username can't be empty!"),
            },
        ]);

        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);

        console.log(`Engineer ${answers.name} added to the team.`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const promptIntern = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter the intern's name:",
                validate: (input) => (input ? true : "Name can't be empty!"),
            },
            {
                type: 'input',
                name: 'id',
                message: "Enter the intern's employee ID:",
                validate: (input) => (input ? true : "ID can't be empty!"),
            },
            {
                type: 'input',
                name: 'email',
                message: "Enter the intern's email address:",
                validate: (input) => (input ? true : "Email can't be empty!"),
            },
            {
                type: 'input',
                name: 'school',
                message: "Enter the intern's school:",
                validate: (input) => (input ? true : "School can't be empty!"),
            },
        ]);

        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);

        console.log(`Intern ${answers.name} added to the team.`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const promptUser = async () => {
    let isFinished = false;

    while (!isFinished) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Select the role you want to add:',
                choices: ['Manager', 'Engineer', 'Intern', 'Finish'],
            },
        ]);

        if (answer.role === 'Manager') {
            await promptManager();
        } else if (answer.role === 'Engineer') {
            await promptEngineer();
        } else if (answer.role === 'Intern') {
            await promptIntern();
        } else if (answer.role === 'Finish') {
            isFinished = true;
        }
    }
};

const init = async () => {
    try {
        await promptUser(); 

        // Generate HTML and write to file
        const html = render(teamMembers);
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, html);

        console.log(`Team HTML file generated at ${outputPath}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Call init to start the application
init();


