const {promptOptions, queryDB} = require('./utils/prompt');

const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

promptOptions()
    .then(choice => {return queryDB(choice)});