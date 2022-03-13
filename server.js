//importing packages: 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv');

//db & mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    database: 'peopledb',
    user: 'root',
    password: MYSQL_PASS.env
});
db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to tracker db.');
    menuChoicer();
});

const menuChoicer = () => {
    inquirer
    .prompt ([{
        type: 'list',
        name: 'choice',
        message: 'Select one option: ',
        choice: [
            'view employees',
            'add employee',
            'view roles',
            'add role',
            'update employee role',
            'view departments',
            'add department',
            'exit'
        ],}
    ])
    .then(answers => {
        if (answers.menu === 'view employees') {
            viewEmployees();
        };
        if (answers.menu === 'add employee') {
            addEmployee();
        };
        if (answers.menu === 'view roles') {
            viewRoles();
        };
        if (answers.menu === 'add role') {
            addRole();
        };
        if (answers.menu === 'update employee role') {
            updateEmployee();
        };
        if (answers.menu === 'view departments') {
            viewDepartments();
        };
        if (answers.menu === 'add department') {
            addDepartment();
        };
        if (answers.menu === 'exit') {
            viewExit();
        };

    })
    .catch((err) => {
        if (err) throw err;
    });
};