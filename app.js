const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee  = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

let employeeList = ["Manager", "Engineer", "Intern", "I don't want to add anymore employees"];


//figure out a way only one manager can be created?
function chooseEmployee() {
    inquirer.prompt({
        name: "employeeType",
        message: "Which type of employee would you like to add?",
        type: "rawlist",
        choices: employeeList
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


  //make sure manager id and office number is a number and id is not already taken, email is valid
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
        console.log(new Manager(answer.name, answer.managerID, answer.email, answer.officeNumber));
        //ensure only one manager is created
        for( var i = 0; i < employeeList.length; i++){ 
            if (employeeList[i] === "Manager") {
                employeeList.splice(i, 1); 
            }
        };
        chooseEmployee();
    });
};

//make sure engineer id is a number and id is not already taken, email is valid
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
        console.log(new Engineer(answer.name, answer.engineerID, answer.email, answer.gitHubUsername));
        chooseEmployee();
    });
};

//make sure engineer id is a number and id is not already taken, email is valid
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
        console.log(new Intern(answer.name, answer.internID, answer.email, answer.school));
        chooseEmployee();
    });
};

//figure out where to get data from
function createTeam(){
    const outputPath = path.resolve(__dirname, "output", "team.html");
    fs.writeFile(outputPath, data ,function(err){
        if(err) throw err;
        console.log("team.html successfully created!");
    });
};


chooseEmployee();


const render = require("./lib/htmlRenderer");
