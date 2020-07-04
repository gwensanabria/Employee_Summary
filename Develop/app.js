const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

function managerInput () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "Manager's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "Manager's ID Number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "Manager's Email?",
        },
        {
            type: 'input',
            name: 'officeNum',
            message: "Manager's office Number?",
        },
    ]).then(response => {
        const manager = new Manager(response.name, parseInt(response.id), response.email, parseInt(response.officeNum))
        employees.push(manager)
        addTeamMember()
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type:'list' ,
            name: 'type',
            message: 'What team member role would you like to add?',
            choices: [
                'Engineer',
                'Intern',
                'Done'
            ]
        }
    ]).then(response => {
        if(response.type === 'Engineer') {
            addEngineer()
        } else if (response.type === 'Intern') {
            addIntern()
        } else {
            render (employees)
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type:'input' ,
            name: 'name',
            message: "Engineer's Name?",
        },

        {
            type:'input' ,
            name: 'id',
            message: "Engineer's ID?",
        },

        {
            type:'input' ,
            name: 'email',
            message: "Engineer's email?",
        },

        {
            type:'input' ,
            name: 'github',
            message: "Engineer's Github?",
        }
    ]).then(response => {
        const engineer = new Engineer(response.name, parseInt(response.id), response.email, response.github)
        employees.push(engineer)
        addTeamMember()
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type:'input' ,
            name: 'name',
            message: "Intern's Name?",
        },

        {
            type:'input' ,
            name: 'id',
            message: "Intern's ID?",
        },

        {
            type:'input' ,
            name: 'email',
            message: "Intern's email?",
        },

        {
            type:'input' ,
            name: 'school',
            message: "Intern's school?",
        }
    ]).then(response => {
        const intern = new Intern(response.name, parseInt(response.id), response.email, response.school)
        employees.push(intern)
        addTeamMember()
    })
}

managerInput()






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
