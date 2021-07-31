INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Development'),
    ('Research');

INSERT INTO  roles (title, salary, department_id)
VALUES 
    ('Saleman', 10.00, 1),
    ('Senior Salesman', 11.00, 1),
    ('Developer', 20.00, 2),
    ('Senior Developer', 25.00, 2),
    ('Researcher', 25.00, 3),
    ('Senior Researcher', 30.00, 3);

INSERT INTO  employees (first_name, last_name, role_id, manager)
VALUES 
    ('Sam', 'Sheapard', 1, 3),
    ('Thomas', 'Sheapard', 1, 3),
    ('Alicia', 'Sheapard', 2, Null),
    ('Dana', 'Delanor', 3, Null),
    ('Daniel', 'Delanor', 3, 4),
    ('Thomas','Delany', 4, Null),
    ('Wambam', 'Delanor', 4, 4),
    ('Scambalamaban', 'Deelanor', 5, Null),
    ('Mr Thumnas','Delany', 5, Null);

