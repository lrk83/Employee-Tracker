DROP TABLE IF EXISTS departments;
DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
);