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

INSERT INTO Users (username, password) VALUES
    ('admin', '8da193366e1554c08b2870c50f737b9587c3372b656151c4a96028af26f51334');