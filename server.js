const {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment} = require('./utils/queries');

const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

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