DROP DATABASE IF EXISTS hw10_employee_tracker_db;
CREATE DATABASE hw10_employee_tracker_db;
USE hw10_employee_tracker_db;

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(100),
  role VARCHAR(100),
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT, --to hold reference to department role belongs to
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  role_id INT, --to hold reference to role employee has
  manager_id INT NULL, --to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  PRIMARY KEY (id) 
);