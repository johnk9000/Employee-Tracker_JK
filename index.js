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
            //console.log('you chose: ' + ans.departments) // DEL
        switch (ans.departments) {
            case "Sales":
            var id = 100;
            break;
            case "Engineering":
            var id = 200;
            break;
        }
        connection.query(query, { department_id: id }, function(err, res) {
            if (err) throw err;
                console.log('gathering personnel... \n')
                    //console.log(res) //--verbose
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
            //console.log('you chose: ' + ans.managers) //DEL
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
                console.log('gathering personnel... \n')
                    //console.log(res) //--verbose
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
    try {
        let mngrChoice = ["Alice", "John", new inquirer.Separator()]
        let roleChoice = ["Sales Person", "Engineer", "Developer", new inquirer.Separator()]
        let editSet = [
            {type: 'input', message: 'First Name: ', name: "nameFirst"},
            {type: 'input', message: 'Last Name: ', name: "nameLast"},
            {type: 'list', message: 'Employee Role: ', name: "roleId", choices: roleChoice},
            {type: 'list', message: 'Reports to: ', name: "mngrId", choices: mngrChoice},
        ]
        inquirer.prompt(editSet).then( ans => {
            let { nameFirst, nameLast, roleId, mngrId } = ans;
            switch (ans.mngrId) {
                case "Alice":
                    var id = 1;
                    break;
                case "John":
                    var id = 2;
                    break;
            }
            switch (ans.roleId) {
                case "Sales Person":
                    var rid = 1;
                    break;
                case "Engineer":
                    var rid = 3;
                    break;
                case "Developer":
                    var rid = 4
                    break;
            }
            var ansArray = ['"' + nameFirst + '"','"' + nameLast + '"', rid, id];
                console.log(ansArray.join(", "))
            let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id)" 
            query+= " VALUES(" + ansArray.join(", ") + ");"
            connection.query(query, function(err, res) {
                if (err) throw err;
                    console.log('adding personnel... \n')
                        //console.log(res) //--verbose
                console.table(res)
            })
            navux()
        }) 
    } catch(err) {
        console.log(err)
    }
}

function editEmployee() {
try {
    let query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        if (err) throw err;
        const employeeList = [];
        res.forEach(entry => {
            employeeList.push(entry.first_name + " " + entry.last_name)
            console.log(entry.first_name + " " + entry.last_name)
        })
            
        let mngrChoice = ["Alice", "John", new inquirer.Separator()]
        let roleChoice = ["Sales Person", "Engineer", "Developer", new inquirer.Separator()]
        let editSet = [
        {type: 'list', message: 'Employee: ', name: "employee", choices: employeeList},
        {type: 'list', message: 'Employee Role: ', name: "roleId", choices: roleChoice},
        {type: 'list', message: 'Reports to: ', name: "mngrId", choices: mngrChoice},
        ]
        inquirer.prompt(editSet).then( ans => {
            console.log(ans)
        })
    })
    } catch(err) {
        
    }
}

function removeEmployee() {
    try {

    } catch(err) {
        
    }
}
// INIT ==================================================================================


