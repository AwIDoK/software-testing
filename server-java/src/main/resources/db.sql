CREATE TABLE IF NOT EXISTS Lists (
                                     list_id SERIAL not null,
                                     name varchar(50) not null,
                                     primary key (list_id)
);

CREATE TABLE IF NOT EXISTS Todos (
                                     todo_id SERIAL not null,
                                     list_id int not null,
                                     completed boolean not null default false,
                                     name varchar(50) not null,
                                     primary key (todo_id),
                                     foreign key (list_id) REFERENCES Lists (list_id) on delete cascade
);

INSERT INTO Lists (name) VALUES
('list1'),
('list2'),
('list3');

INSERT INTO Todos (list_id, name, completed) VALUES
(1, 'todo1', false),
(1, 'todo2', false),
(1, 'todo3', true),
(2, 'todo4', false),
(3, 'todo5', false);