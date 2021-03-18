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