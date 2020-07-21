USE hw10_employee_tracker_db;

-- Add departments, roles, employees
-- let nameFirst, nameLast, roleId, mngrId, deptName, roleName, deptTitle, deptSalary, deptId;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES(nameFirst, nameLast, roleId, mngrId);

INSERT INTO department (name, role, title, salary, department_id)
VALUES (deptName, roleName, deptTitle, deptSalary, deptId);

-- View departments, roles, employees

-- Returns employees under manager (No.1)
SELECT employee.first_name, employee.last_name, department.name, department.role, department.title 
FROM employee
LEFT JOIN department 
ON employee.role_id = department.id
WHERE employee.manager_id = 1; -- change ID val here to select manager (1, 2, 3, ...)

-- Update employee roles
SELECT * FROM