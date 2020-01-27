const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHubUsername){
        super(name, id, email);
        this.gitHubUsername = gitHubUsername;
    }
    getGitHub(){
        return `https://www.github.com/${this.gitHubUsername}`;
    }
    getRole(){
        const role = "Engineer";
        return role;
    }

}

module.exports = Engineer;