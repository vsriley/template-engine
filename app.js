const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//figure out a way only one manager can be created?
function chooseEmployee() {
    inquirer.prompt({
        name: "employeeType",
        message: "Which type of employee would you like to add?",
        type: "rawlist",
        choices: ["Manager","Engineer", "Intern", "I don't want to add anymore employees"]
      })
      .then(({employeeType}) => {
        switch (employeeType) {
            case "Manager":
                return createManager();
            case "Engineer":
                return createEngineer();
            case "Intern":
                return createIntern();
            case "I don't want to add anymore employees":
                return createTeam();
        }
      });
  };


  //make sure manager id and office number is a number, email is valid
function createManager(){
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is your manager's name?"
    },
    {
        name: "managerID",
        type: "input",
        message: "What is your manager's ID?"
    },
    {
        name: "email",
        type: "input",
        message: "What is your manager's email?"
    },
    {
        name: "officeNumber",
        type: "input",
        message: "What is your manager's office number?"
    }]).then((answer) => {
        console.log(answer);
    });
    
};

//make sure engineer id is a number, email is valid
function createEngineer(){
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is your engineers's name?"
    },
    {
        name: "engineerID",
        type: "input",
        message: "What is your engineer's ID?"
    },
    {
        name: "email",
        type: "input",
        message: "What is your engineer's email?"
    },
    {
        name: "gitHubUsername",
        type: "input",
        message: "What is your engineer's GitHub username?"
    }]).then((answer) => {
        console.log(answer);
    });

};

//make sure engineer id is a number, email is valid
function createIntern(){
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is your intern's name?"
    },
    {
        name: "internID",
        type: "input",
        message: "What is your intern's ID?"
    },
    {
        name: "email",
        type: "input",
        message: "What is your intern's email?"
    },
    {
        name: "school",
        type: "input",
        message: "Where does your intern go to school?"
    }]).then((answer) => {
        console.log(answer);
    });
};

function createTeam(){

};


chooseEmployee();

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");
