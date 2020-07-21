var mysql = require("mysql");
var inquirer = require("inquirer");
const { Console } = require("console");
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
    })
}

async function navux() {
    try{
        console.log("--------------- \n")
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
    })
} catch(err) {
    console.log(err)
}
}
// QUERY INJECTIONS ======================================================================

// views ---------------------------------------------------------------------------------
function viewEmployees() {
    let query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        if (err) throw err;
            //console.log(res) // DEL
        console.table(res)
        navux();
    })
}

function viewDepartment() {        
    try {
    let deptChoice = ["Sales", "Engineering", new inquirer.Separator()]
    let inqSet = {type: 'list', message: 'Departments: ', name: "departments", choices: deptChoice}
    let query = "SELECT employee.first_name, employee.last_name, department.name, department.role, department.title " 
    query += "FROM employee LEFT JOIN department ON employee.role_id = department.id WHERE ?"
    inquirer.prompt(inqSet).then( ans => {
        console.log('you chose: ' + ans.departments)
        switch (ans.departments) {
            case "Sales":
            query += 100;
            break;
            case "Engineering":
            query += 200;
            break;
        }
        connection.query(query, { department_id: id }, function(err, res) {
            if (err) throw err;
                console.log('gathering personell... \n')
                    console.log(res)
            console.table(res)
        })
        navux();
    })
    } catch(err) {
        console.log(err)
    }
}
async function viewManager() {
    try {
    let mngrChoice = ["Alice", "John", new inquirer.Separator()]
    let inqSet = {type: 'list', message: 'Managers: ', name: "managers", choices: mngrChoice}
    inquirer.prompt(inqSet).then( ans => {
        let query = "SELECT employee.first_name, employee.last_name, department.name, department.role, department.title "
        query += "FROM employee LEFT JOIN department ON employee.role_id = department.id WHERE employee.manager_id="
            console.log('you chose: ' + ans.managers)
        switch (ans.managers) {
            case "Alice":
                query += 1;
                break;
            case "John":
                query += 2;
                break;
        }
        connection.query(query, function(err, res) {
            if (err) throw err;
                console.log('gathering personell... \n')
                console.log(res)
            console.table(res)
        })
        navux();
    })
    } catch(err) {
        console.log(err)
    }
}

// add/edit/remove -----------------------------------------------------------------------
function addEmployee() {

}

function editEmployee() {

}

function removeEmployee() {

}
// INIT ==================================================================================


