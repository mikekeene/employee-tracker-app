INSERT INTO department (id, department_name)
VALUES  
(111, "Cartman"),
(222, "Kyle"),
(333, "Stan"),
(444, "Kenny"),
(555, "Butters");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "The Racoon", 990000, 111),
(2, "The Human Kite", 800000, 222),
(3, "Toolshed", 450000, 333),
(4, "Mysterion", 100000, 444),
(5, "Professor Chaos", 700000, 555);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Eric", "Cartman", 11800, 12),
(2, "Kyle", "Broflovski", 22899, 23),
(3, "Stan", "Marsh", 38388, 34),
(4, "Kenny", "McCormick", 44877, 45),
(5, "Leopold", "Stotch", 58566, 56);