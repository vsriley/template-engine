const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        this.officeNumber = officeNumber;
        super(name, id, email);
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        const role = "Manager";
        return role;
    }
}