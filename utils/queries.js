const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//vars for global scope
var managerID=0;
var employeeID=0;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySQLy76y76y76',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db database')
);

//View all departments
//formatted table with department names, department ids
const viewAllDepartments = () => {
    db.promise().query('SELECT * FROM departments')
        .then(([rows,fields]) => {
            console.log(`
            
====================
View All Departments
====================
            
            `);
            console.table(rows); 

            console.log(`
            
            (click up or down to choose another option)
            
            `);
        });
};

//View all roles
//job title, role id, the department that role belongs to, and the salary
const viewAllRoles = () => {
    db.promise().query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id=departments.id')
        .then(([rows,fields]) => {
            console.log(`
                
==============
View All Roles
==============
            
            `);
            console.table(rows);

            console.log(`
            
            (click up or down to choose another option)
            
            `);
        });
};

//View all employees
//employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployees = () =>{
    db.promise().query('SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id')
        .then(([results,fields]) => {

            console.log(`
                
==================
View All Employees
==================
            
            `);

            let updatedResults=[];
            
            for(x=0;x<results.length;x++){
                let newManager = null;
                if (results[x].manager_id!=null){
                    let managerID = results[x].manager_id;
                    for (y=0;y<results.length;y++){
                        if (managerID===results[y].id){
                            newManager = results[y].first_name+' '+results[y].last_name;
                        };
                    };
                };

                newRow = {
                    id: results[x].id,
                    first_name: results[x].first_name,
                    last_name: results[x].last_name,
                    job_title: results[x].job_title,
                    department: results[x].department,
                    salary: results[x].salary,
                    manager: newManager
                };

                updatedResults.push(newRow);
            };

            console.table(updatedResults);

            console.log(`
            
            (click up or down to choose another option)
            
            `);
        });
};

//Add a department
const addDepartment = (params) => {

    return db.promise().query('INSERT INTO departments (name) VALUES (?)',params);

};

//Add a role
const addRole = (name, salary, department) => {

    getDepartmentID(department)
        .then(([rows, fields]) => {

        params = [name,salary,rows[0].id];

        return db.promise().query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',params);
        });
};

//Add an employee
const addEmployee = (first, last, role, manager) => {

    return getEmployeeID(manager)
        .then(([rows,fields]) => {

        if (!rows){
            managerID=null;
        }else{
            managerID=rows[0].id
        }

        return getRoleID(role)})
            .then(([rows,fields]) => {

            params = [first, last, rows[0].id,managerID];

            return db.promise().query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',params);
        });

};

//Update an employee
const updateEmployee = (name, newRole) => {

    return getEmployeeID(name)
        .then(([rows,fields]) => {

            employeeID=rows[0].id;

            return getRoleID(newRole)})
        .then(([rows,fields]) => {

            params = [rows[0].id,employeeID];

            return db.promise().query('UPDATE employees SET role_id =? WHERE id=?',params);
        });

};

//Helper funtcions for passing around data
const getDepartments = () => {

    let returnData = [];

    db.query('SELECT * FROM departments', (err,result) => {
           
        for (x=0;x< result.length; x++){
            returnData.push(result[x].name)
        }
    });

    return returnData;
};

const getEmployees = () => {

    return db.promise().query('SELECT first_name FROM employees')

};

const getRoleID = (role) =>{

    return db.promise().query('SELECT * FROM roles WHERE title = ?',role);
};

const getDepartmentID = (name) => {

    return db.promise().query('SELECT * FROM departments WHERE name = ?',name)

};

const getRoles = () => {

    return db.promise().query('SELECT * FROM roles');

};

const getEmployeeID = (name) => {

    if (name===null){
        return null;
    };

    return db.promise().query('SELECT * FROM employees WHERE first_name = ?',name)

};

module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployee, getDepartments, getEmployees, getRoles}