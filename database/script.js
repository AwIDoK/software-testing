const { Client } = require('pg');

async function createTestDatabase() {
    const pgclient = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: 'postgres',
        password: 'postgres',
        database: 'todo_managertest'
    });
    await client.connect();
    await client.query("DROP TABLE Todos;\n" +
        "DROP TABLE Lists;\n" +
        "CREATE TABLE Lists (\n" +
        "    list_id SERIAL not null,\n" +
        "    name varchar(50) not null,\n" +
        "    primary key (list_id)\n" +
        ");\n" +
        "CREATE TABLE Todos (\n" +
        "    todo_id SERIAL not null,\n" +
        "    list_id int not null,\n" +
        "    completed boolean not null default false,\n" +
        "    name varchar(50) not null,\n" +
        "    primary key (todo_id),\n" +
        "    foreign key (list_id) REFERENCES Lists (list_id) on delete cascade\n" +
        ");" +
        "INSERT INTO Lists (name) VALUES\n" +
        "    (\'list1\'),\n" +
        "    (\'list2\'),\n" +
        "    (\'list3\');\n" +
        "\n" +
        "INSERT INTO Todos (list_id, name, completed) VALUES\n" +
        "    (1, \'todo1\', false),\n" +
        "    (1, \'todo2\', false),\n" +
        "    (1, \'todo3\', true),\n" +
        "    (2, \'todo4\', false),\n" +
        "    (3, \'todo5\', false);");

    await client.end();
}


createTestDatabase();