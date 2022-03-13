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
            'view all tables'
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
        if (menu.choice === 'view all tables') {
            viewTables();
        };

    })
    .catch((err) => {
        if (err) throw err;
    });
};

const viewEmployees = () => {
    const sql =  
    `SELECT * FROM employee`; 
    db.query(sql, (err, res) => {
        console.log('Now viewing employees');
        console.table(res);
        console.log('returning to menu choices...');
        if (err) throw err;
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
            viewNewEmployee();
        });
        const viewNewEmployee = () => {
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
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        console.log('Now viewing roles');
        console.table(res);
        console.log('returning to menu choices...');
        if (err) throw err;
        menuChoicer();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Name of new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary of new role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Department id of new role?'
        },
    ])
    .then(menu => {
        const params = [menu.role, menu.salary, menu.department];
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        db.query(sql, params , (err, res) => {
            if (err) throw err;
            console.log(`Added new role: ${menu.role}`);
            viewNewRole();
        });
        const viewNewRole = () => {
            const sql = `SELECT * FROM role`;
            db.query(sql, (err, res) => {
                console.log('Now viewing added role');
                console.table(res);
                console.log('returning to menu choices...');
                menuChoicer(); 
            });
        };
    });
};

const updateEmployeeRole = () => {
    const sqlAllEmployees = `SELECT CONCAT (first_name, ' ', last_name) AS 'name', id FROM employee`;
    db.query(sqlAllEmployees, (err, res) => {
        console.log(res);
        let allEmployees = [];
        for (let i = 0; i < res.length; i++) {
            const allEmployeeId = res[i].id;
            allEmployees.push(allEmployeeId);
        };
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateId',
                message: 'Choose the id of the employee whose role is to be updated',
                choices: allEmployees
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is role id of the new role?'
            }
        ])
        .then(menu => {
            let updatedEmployeeId = menu.updateId;
            let updatedRoleName = menu.role;
            const updateRoleQuery = `UPDATE employee SET ? WHERE ?`;
            const updateValuesQuery = [{role_id: updatedRoleName}, {id: updatedEmployeeId}];
        
            db.query(updateRoleQuery, updateValuesQuery, (err, res) => {
                if (err) throw err;
                console.log('Employee role has been updated');
                viewUpdatedRole();
            });
            const viewUpdatedRole = () => {
                const sqlRole = `SELECT * FROM employee`;
                db.query(sqlRole, (err, res) => {
                    console.log('Viewing updated role table');
                    console.table(res);
                    console.log('returning to menu choices...');
                    menuChoicer(); 
                });
            };
        });
    });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        console.log('Now viewing departments');
        console.table(res);
        console.log('returning to menu choices...');
        if (err) throw err;
        menuChoicer();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'add',
            message: 'What is the name of the new department?'
        }
    ])
    .then(menu => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        db.query(sql, menu.add, (err, res) => {
            if (err) throw err;
            console.log(`Added new employee: ${menu.add}`);
            viewNewDepartment();
        });
        const viewNewDepartment = () => {
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, res) => {
                console.log('Now viewing added department');
                console.table(res);
                console.log('returning to menu choices...');
                menuChoicer(); 
            });
        };
    });
};

const viewTables = () => {
    console.log('Now viewing all database tables: ');
    const employeeTable = `SELECT * FROM employee`;
    db.query(employeeTable, (err, res) => {
        console.table(res);
        if (err) throw err;
    });
    const roleTable = `SELECT * FROM role`;
    db.query(roleTable, (err, res) => {
        console.table(res);
        if (err) throw err;
    }); 
    const departmentTable = `SELECT * FROM department`;
    db.query(departmentTable, (err, res) => {
        console.table(res);
        if (err) throw err;
    }); 
};