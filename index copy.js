const inquirer = require("inquirer");
const fs = require("fs");
// const mysql = require("mysql2");
require("console.table");
const db = require("./db/connection");

const { returnToMainMenu } = require("./lib/functions");
const { viewDepatments } = require("./lib/functions");
const { viewRoles } = require("./lib/functions");
const { viewEmployees } = require("./lib/functions");
const { addDepatment } = require("./lib/functions");
const { addRole } = require("./lib/functions");
const { addEmployee } = require("./lib/functions");
const { updateEmployeeRole } = require("./lib/functions");
/// this code is missing: the return to main menu prompt for the action functions (add and update), tidy up code - separate the functions from the prompts

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   // MySQL username,
//   user: "root",
//   // TODO: Add MySQL password here
//   password: "Scuba123!",
//   database: "employee_db",
// });

// function returnToMainMenu() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "returnToMenu",
//         message: "Would you like to rerutn to the main menu?",
//         choices: ["Yes, return to main menu", "No, exit application"],
//       },
//     ])
//     .then((answer) => {
//       if (answer.returnToMenu === "Yes, return to main menu") {
//         userPrompts();
//       } else {
//         console.log("Exiting the application. Goodbye!");
//         db.end();
//       }
//     });
// }

// async function viewDepatments() {
//   const [department] = await db.promise().query("select * from department");
//   console.table(department);
//   returnToMainMenu();
// }

// async function viewRoles() {
//   const [role] = await db.promise().query("select * from role");
//   console.table(role);
//   returnToMainMenu();
// }

// async function viewEmployees() {
//   const [employee] = await db.promise().query("select * from employee");
//   console.table(employee);
//   returnToMainMenu();
// }

// async function addDepatment() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "departmentName",
//         message: "name the deprtment",
//       },
//     ])
//     .then(async (answers) => {
//       await db
//         .promise()
//         .query(
//           `insert into department (name) VALUES ("${answers.departmentName}")`
//         );
//     });
// }

// async function addRole() {
//   const [department] = await db.promise().query("select * from department");
//   const departments = department.map((dept) => ({
//     value: dept.id,
//     name: dept.name,
//   }));
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "roleTitle",
//         message: "name the role",
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the salary for this role?",
//       },
//       {
//         type: "list",
//         name: "department",
//         message: "what is the department for this role?",
//         choices: departments,
//       },
//     ])
//     .then(async (answers) => {
//       await db
//         .promise()
//         .query(
//           `insert into role (title, salary, department_id) VALUES ("${answers.roleTitle}", ${answers.salary}, ${answers.department} )`
//         )
//         .then(returnToMainMenu());
//     });
// }

// async function addEmployee() {
//   const [role] = await db.promise().query("select * from role");
//   const roles = role.map((role) => ({
//     value: role.id,
//     name: role.title,
//   }));
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: "Insert employee first name",
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: "Insert employee last name",
//       },
//       {
//         type: "list",
//         name: "role",
//         message: "what is the role of this employee?",
//         choices: roles,
//       },
//     ])
//     .then(async (answers) => {
//       await db
//         .promise()
//         .query(
//           `insert into employee (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.role})`
//         )
//         .then(returnToMainMenu());
//     });
// }

// async function updateEmployeeRole() {
//   const [employee] = await db.promise().query("select * from employee");
//   const employees = employee.map((employee) => ({
//     value: employee.id,
//     name: `${employee.first_name} ${employee.last_name} ${employee.id}`,
//   }));

//   const [role] = await db.promise().query("select * from role");
//   const roles = role.map((role) => ({
//     value: role.id,
//     name: role.title,
//   }));

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeChoice",
//         message: "Choose the employee to update",
//         choices: employees,
//       },
//       {
//         type: "list",
//         name: "roleChoice",
//         message: "Choose the updated role for this employee",
//         choices: roles,
//       },
//     ])
//     .then(async (answers) => {
//       await db
//         .promise()
//         .query("UPDATE employee SET role_id = ? WHERE id = ?", [
//           answers.roleChoice,
//           answers.employeeChoice,
//         ])
//         .then(returnToMainMenu());
//     });
// }

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
    // .then((answers) => {
    //   console.log(answers);
    //   switch (answers.userOptions) {
    //     case "view all departments":
    //       viewDepatments();
    //       break;
    //     case "view all roles":
    //       viewRoles();
    //       break;
    //     case "view all employees":
    //       viewEmployees();
    //       break;
    //     case "add a department":
    //       addDepatment();
    //       break;
    //     case "add a role":
    //       addRole();
    //       break;
    //     case "add an employee":
    //       addEmployee();
    //       break;
    //     case "update an employee role":
    //       updateEmployeeRole();
    //       break;
    //   }
    // });
}

// userPrompts();

// module.exports = userPrompts;
