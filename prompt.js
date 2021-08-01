const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, getDepartments, getEmployees, getRoles, updateEmployee} = require('./utils/queries');

//vars for global scope
var managerChoices = [];
var employeeChoices = [];

//Options menu
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

//Handle each option
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

    //Add a Department
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

    //Add a Role
    if (choice.option==="Add a Role"){

        let departmentChoices = getDepartments();

        return inquirer.prompt([
            {
                type:'input',
                name: 'name',
                message: 'What role would you like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is this role's salary?"
            },
            {
                type: 'list',
                name: 'department',
                message: "What department is this role in?",
                choices: departmentChoices
            },
        ])
            .then(roleInput => {return addRole(roleInput.name, roleInput.salary,roleInput.department)})
            .then( () => {
                console.log(`
                
Role successfully added!
                
                `);

                return promptOptions()})
            .then(choice =>{return queryDB(choice)});
    };

    //Add an Employee
    if (choice.option==="Add an Employee"){

        return getEmployees()
            .then(([rows, fields]) => {
                let textRowData = rows;

                for (x=0;x<textRowData.length;x++){
                    managerChoices.push(textRowData[x].first_name);
                };

            return getRoles()})
                .then(([rows, fields]) => {

                let textRowData = rows;

                let roleChoices=[];

                for (x=0;x<textRowData.length;x++){
                    roleChoices.push(textRowData[x].title);
                };
                
                return inquirer.prompt([
                {
                    type:'input',
                    name: 'first_name',
                    message: "What is the employee's first name?"
                },
                {
                    type:'input',
                    name: 'last_name',
                    message: "What is the employee's last name?"
                },
                {
                    type:'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                },
            ])
        })
        .then(employeeInput => {return addEmployee(employeeInput.first_name, employeeInput.last_name, employeeInput.role, employeeInput.manager)})
        .then( () => {
            console.log(`
                
Employee successfully added!
                            
            `);
            
            return promptOptions()})
            .then(choice =>{return queryDB(choice)});
    };

    //Update an Employee's Role
    if (choice.option==="Update an Employee's Role"){
        
            return getEmployees()
        .then(([rows, fields]) => {
            let textRowData = rows;

            for (x=0;x<textRowData.length;x++){
                employeeChoices.push(textRowData[x].first_name);
            };
        
            return getRoles()})
        .then(([rows,fields]) => {

            let textRowData = rows;

            let roleChoices=[];

            for (x=0;x<textRowData.length;x++){
                roleChoices.push(textRowData[x].title);
            };
     
            return inquirer.prompt([
                {
                    type:'list',
                    name: 'name',
                    message: "Which employee would you like to update?",
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: "What is the employee's new role?",
                    choices: roleChoices
                }
            ])
        })
        .then(updateInput => {return updateEmployee(updateInput.name, updateInput.newRole)})
        .then( () => {
            console.log(`
                
Employee successfully updated!
                            
            `);
            
            return promptOptions()})
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