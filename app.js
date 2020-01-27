const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee  = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

let employeeList = ["Manager", "Engineer", "Intern", "I don't want to add anymore employees"];
const employees = [];
const employeeID = [];


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
        message: "What is your manager's ID?",
        validate: validateID
    },
    {
        name: "email",
        type: "input",
        message: "What is your manager's email?",
        validate: validateEmail
    },
    {
        name: "officeNumber",
        type: "input",
        message: "What is your manager's office number?"
    }]).then((answer) => {
        console.log(answer);
        const newManager = new Manager(answer.name, answer.managerID, answer.email, answer.officeNumber);
        employees.push(newManager);
        employeeID.push(answer.managerID);
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
        message: "What is your engineer's ID?",
        validate: validateID
    },
    {
        name: "email",
        type: "input",
        message: "What is your engineer's email?",
        validate: validateEmail
    },
    {
        name: "gitHubUsername",
        type: "input",
        message: "What is your engineer's GitHub username?"
    }]).then((answer) => {
        console.log(answer);
        const newEngineer = new Engineer(answer.name, answer.engineerID, answer.email, answer.gitHubUsername);
        employees.push(newEngineer);
        employeeID.push(answer.engineerID);
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
        message: "What is your intern's ID?",
        validate: validateID
    },
    {
        name: "email",
        type: "input",
        message: "What is your intern's email?",
        validate: validateEmail
    },
    {
        name: "school",
        type: "input",
        message: "Where does your intern go to school?"
    }]).then((answer) => {
        console.log(answer);
        const newIntern = new Intern(answer.name, answer.internID, answer.email, answer.school);
        employees.push(newIntern);
        employeeID.push(answer.internID);
        chooseEmployee();
    });
};

//figure out where to get data from
function createTeam(){
    const outputPath = path.resolve(__dirname, "output", "team.html");
    fs.writeFile(outputPath, render(employees) ,function(err){
        if(err) throw err;
        console.log("Team successfully created!");
    });
};

// Ensure id is a number and that it is not already in use by another employee
function validateID(id){
    if(isNaN(id)){
        return "Invalid ID. Please enter a valid number for employee ID";
    }
    for (i = 0; i < employeeID.length; i++) {
        if (id === employeeID[i]) {
          return "Invalid ID. Please enter a unique employee ID";
        }
    }
    return true;
};

// Ensure email address contains @ and .
function validateEmail(email){
    if(email.indexOf("@") != -1 && email.indexOf(".") != -1){
        return true;
    }else{
        return "Please enter a valid email address";
    }
};

chooseEmployee();


