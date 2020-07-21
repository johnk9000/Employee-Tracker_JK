var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Welcome_1!",
    database: "hw10_employee_tracker_db"
  });
 // DATA PIPE ============================================================================== 
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
  });

  // INQUIRER ==============================================================================
function init() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Edit Employee",
            "Remove Emplyee",
        ],
    }).then(ans => {
            console.log(ans)
        switch (ans.choice) {
            case "View All Employees":
                    console.log('case: view all employees, starting fcn viewEmployees()')
                viewEmployees();
                break;
            case "View All Employees by Department":
                viewDepartment();
                break;
            case "View All Employees by Manager":
                viewManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Edit Employee":
                editEmployee();
                break;
            case "Remove Emplyee":
                removeEmployee();
                break;
        }
        navux()
    })
}

function navux() {
    inquirer.prompt({
        type: "list",
        message: new inquirer.Separator(),
        name: "navChoice",
        choices: [
            "continue...",
            "EXIT"
        ],
    }).then( ans => {
        if(ans.navChoice === "continue..."){
            init();
        } else {
            console.log("Ending session with " + connection);
            connection.end();
        }
    }
    )
}
// QUERY INJECTIONS ======================================================================

// views ---------------------------------------------------------------------------------
function viewEmployees() {
    let query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        if (err) throw err;
            //console.log(res) // DEL
        console.table(res)
    })
}

function viewDepartment() {
    let deptChoice = ["Sales", "Engineering"]
    let inqSet = {type: 'list', message: 'Departments: ', name: "departments", choices: deptChoice}
    let query = "SELECT * FROM department WHERE department_id="
    inquirer.prompt(inqSet),then( ans => {
        switch (ans.choices) {
            case "Sales":
            query += "100";
            break;
            case "Engineering":
            query += "200";
            break;
        }
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res)
        })
    })
}

function viewManager() {
    let mngrChoice = ["Alice", "John"]
    let inqSet = {type: 'list', message: 'Managers: ', name: "managers", choices: mngrChoice}
    inquirer.prompt(inqSet),then( ans => {
        let query = "SELECT * FROM employee WHERE manager_id="
        switch (ans.choices) {
            case "Alice":
            query += "1";
            break;
            case "John":
            query += "2";
            break;
        }
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res)
        })
    })
}

// add/edit/remove -----------------------------------------------------------------------
function addEmployee() {

}

function editEmployee() {

}

function removeEmployee() {

}
// INIT ==================================================================================


