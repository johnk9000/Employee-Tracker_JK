var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "<PASSWORD>",
    database: "hw10_employee_tracker_db"
  });
 // DATA PIPE ============================================================================== 
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
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
    })
}


// QUERY INJECTIONS ======================================================================

// INIT ==================================================================================
init();

