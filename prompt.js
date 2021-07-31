const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment } = require('./utils/queries');

const promptOptions = () =>{
    return inquirer.prompt([
        {
            type:'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee's Role",
                "Exit"
            ]
        }
    ]);
};

const queryDB = (choice) => {
    
    //If Exit, exit
    if (choice.option==="Exit"){
        console.log("Good bye!");
        return;
    };

    //View queries
    if (choice.option === "View All Departments"){
        viewAllDepartments()
    };
    if (choice.option === "View All Roles"){
        viewAllRoles();
    };
    if (choice.option==="View All Employees"){
        viewAllEmployees();
    };

    //Add Queries
    if (choice.option==="Add a Department"){
        return inquirer.prompt([
            {
                type:'input',
                name: 'name',
                message: 'What department would you like to add?'
            }
        ])
            .then(departmentInput => {addDepartment(departmentInput.name)})
            .then(() => {
                console.log(`
                
Department successfully added!
                
                `);
                
                return promptOptions()})
            .then(choice =>{return queryDB(choice)});
    };
    if (choice.option==="Add a Role"){
        return inquirer.prompt([{}])
            .then(promptOptions())
            .then(choice =>{
                return queryDB(choice);
            });
    };
    if (choice.option==="Add an Employee"){
        return inquirer.prompt([{}])
            .then(promptOptions())
            .then(choice =>{
                return queryDB(choice);
            });
    };
    if (choice.option==="Update an Employee's Role "){
        return inquirer.prompt([{}])
            .then(promptOptions())
            .then(choice =>{
                return queryDB(choice);
            });
    };

    //After we've executed a view query, call the prompt again
    return promptOptions().then(choice => {
        return queryDB(choice);
    });
};

module.exports = {promptOptions,queryDB};