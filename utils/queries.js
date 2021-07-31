const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//View all departments
//formatted table with department names, department ids
const viewAllDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results)
    });
};

//View all roles
//job title, role id, the department that role belongs to, and the salary
const viewAllRoles = () => {
    db.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id=departments.id', function (err, results) {
        console.table(results)
    });
}

//View all employees
//employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAllEmployees = () =>{
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id', function(err, results){
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
    });
};

//Add a department
const addDepartment = (params) => {

    db.query('INSERT INTO departments (name) VALUES (?)',params,function(err,result){
        console.log("department successfully added.")
    });
};

//Add a role
const addRole = (params) => {

    db.query('INSERT INTO roles (name, salary, department_id) VALUES (?,?,?)',params,function(err,result){
        console.log("role successfully added.")
    });
};

//Add an employee
const addEmployee = (params) => {

    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?)',params,function(err,result){
        console.log("employee successfully added.")
    });
};

//Update an employee
const updateEmployee = (params) => {

    db.query('UPDATE employees SET role_id =? WHERE id=?',params, function(err,result){
        console.log("employee successfully updated.")
    });
}

module.exports = {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateEmployee}