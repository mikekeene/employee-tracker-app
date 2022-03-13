//importing packages: 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

//db & mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    database: 'peopledb',
    user: 'root',
    password: process.env.MYSQL_PASS
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
        choices: [
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
    .then(menu => {
        if (menu.choice === 'view employees') {
            viewEmployees();
        };
        if (menu.choice === 'add employee') {
            addEmployee();
        };
        if (menu.choice === 'view roles') {
            viewRoles();
        };
        if (menu.choice === 'add role') {
            addRole();
        };
        if (menu.choice === 'update employee role') {
            updateEmployeeRole();
        };
        if (menu.choice === 'view departments') {
            viewDepartments();
        };
        if (menu.choice === 'add department') {
            addDepartment();
        };
        if (menu.choice === 'exit') {
            viewTables();
        };

    })
    .catch((err) => {
        if (err) throw err;
    });
};

const viewEmployees = () => {
    const sql =  
    `   SELECT employee.id, first_name, last_name, title, department_name, manager_id, salary
        FROM employee
        INNER JOIN role
        ON role.id = employee.id
        INNER JOIN department
        ON department.id = employee.id;
    `; 
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('Now viewing employees');
        console.table(res);
        console.log('returning to menu choices...');
        menuChoicer();
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'Whats first name of employee?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'Whats last name of employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Whats role id (5 number) of employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Whats manager id (2 number) for employee?'
        },
    ])
    .then(menu => {
        const params = [menu.first, menu.last, menu.role, menu.manager];
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        db.query(sql, params , (err, res) => {
            if (err) throw err;
            console.log(`Added new employee: ${menu.first}`);
            viewAddEmployee();
        });
        const viewAddEmployee = () => {
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, res) => {
                console.log('Now viewing added employee');
                console.table(res);
                console.log('returning to menu choices...');
                menuChoicer(); 
            });
        };
    });
};


const viewRoles = () => {

};

const addRole = () => {

};

const updateEmployeeRole = () => {

};

const viewDepartments = () => {

};

const addDepartment = () => {

};

const viewTables = () => {

};