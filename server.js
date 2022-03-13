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