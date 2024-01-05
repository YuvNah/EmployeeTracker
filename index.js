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
        .query(
          `insert into department (name) VALUES ("${answers.departmentName}")`
        ); //insert instead of select, the insert comes from the nswer
    });
}

async function addRole() {
  const [department] = await db.promise().query("select * from department");
  const departments = department.map((dept) => ({
    value: dept.id,
    name: dept.name,
  }));
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
      {
        type: "list",
        name: "department",
        message: "what is the department for this role?",
        choices: departments,
      },
    ])
    .then(async (answers) => {
      await db.promise().query(
        `insert into role (title, salary, department_id) VALUES ("${answers.roleTitle}", ${answers.salary}, ${answers.department} )` // how can i call the department id into here
      );
    });
}

async function addEmployee() {
  const [role] = await db.promise().query("select * from role");
  const roles = role.map((role) => ({
    value: role.title,
    name: role.title,
  }));
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Insert employee first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Insert employee last name",
      },
      {
        type: "list",
        name: "role",
        message: "what is the role of this employee?",
        choices: roles,
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query(
          `insert into employee (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.roles})`
        ); //insert instead of select, the insert comes from the nswer
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
        case "view all roles":
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
        case "add an employee":
          addEmployee();
          break;
      }
    });
}

userPrompts();
