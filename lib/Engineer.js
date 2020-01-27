const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHubUsername){
        this.gitHubUsername = gitHubUsername;
        super(name, id, email);
    }
    getGitHub(){
        return `https://www.github.com/${this.gitHubUsername}`;
    }
    getRole(){
        const role = "Engineer";
        return role;
    }

}