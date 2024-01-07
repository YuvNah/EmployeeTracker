function returnToMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "returnToMenu",
        message: "Would you like to rerutn to the main menu?",
        choices: ["Yes, return to main menu", "No, exit application"],
      },
    ])
    .then((answer) => {
      if (answer.returnToMenu === "Yes, return to main menu") {
        userPrompts();
      } else {
        console.log("Exiting the application. Goodbye!");
        db.end();
      }
    });
}

async function viewDepatments() {
  const [department] = await db.promise().query("select * from department");
  console.table(department);
  returnToMainMenu();
}

async function viewRoles() {
  const [role] = await db.promise().query("select * from role");
  console.table(role);
  returnToMainMenu();
}

async function viewEmployees() {
  const [employee] = await db.promise().query("select * from employee");
  console.table(employee);
  returnToMainMenu();
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
        );
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
      await db
        .promise()
        .query(
          `insert into role (title, salary, department_id) VALUES ("${answers.roleTitle}", ${answers.salary}, ${answers.department} )`
        )
        .then(returnToMainMenu());
    });
}

async function addEmployee() {
  const [role] = await db.promise().query("select * from role");
  const roles = role.map((role) => ({
    value: role.id,
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
          `insert into employee (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.role})`
        )
        .then(returnToMainMenu());
    });
}

async function updateEmployeeRole() {
  const [employee] = await db.promise().query("select * from employee");
  const employees = employee.map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name} ${employee.id}`,
  }));

  const [role] = await db.promise().query("select * from role");
  const roles = role.map((role) => ({
    value: role.id,
    name: role.title,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeChoice",
        message: "Choose the employee to update",
        choices: employees,
      },
      {
        type: "list",
        name: "roleChoice",
        message: "Choose the updated role for this employee",
        choices: roles,
      },
    ])
    .then(async (answers) => {
      await db
        .promise()
        .query("UPDATE employee SET role_id = ? WHERE id = ?", [
          answers.roleChoice,
          answers.employeeChoice,
        ])
        .then(returnToMainMenu());
    });
}
module.exports = {
  returnToMainMenu,
  viewDepatments,
  viewRoles,
  viewEmployees,
  addDepatment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
