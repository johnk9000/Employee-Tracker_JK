var mysql = require("mysql");
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

  // QUERY INJECTIONS
