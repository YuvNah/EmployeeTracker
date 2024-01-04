const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Scuba123!",
    database: "employee_db",
  },
  console.log(`Connected to the movies_db database.`)
);

async function viewDepatments() {
  const [department] = await db.promise().query("select * from department");
  console.table(department);
}

async function viewRoles() {
  const [role] = await db.promise().query("select * from role");
  console.table(role);
}

async function viewEmployees() {
  const [employee] = await db.promise().query("select * from employee");
  console.table(employee);
}

async function addDepatment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "name the deprtment",
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query(`insert into department (name) VALUES (${answers})`); //insert instead of select, the insert comes from the nswer
      console.table(department);
    });
}

async function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "name the role",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
    ])
    .then(async (answers) => {
      await db.promise().query(`insert into role (name) VALUES (${answers})`); //insert instead of select, the insert comes from the nswer
      console.table(department);
    });
}

function userPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userOptions",
        message: "Please Choose from one of the options below:",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      switch (answers.userOptions) {
        case "view all departments":
          viewDepatments();
          break;
        case "view all departments":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepatment();
          break;
        case "add a role":
          addRole();
          break;
      }
    });
}

userPrompts();
