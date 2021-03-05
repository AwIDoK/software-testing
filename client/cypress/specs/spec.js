const { Client } = require('pg');

const URL = "http://localhost:3000/"

beforeEach(async () => {
    if (process.env.DATABASE.endsWith("test")) {
        const client = new Client(process.env.DATABASE);
        await client.connect();
        const result = await client.query("" +
            "DROP TABLE Lists;" +
            "DROP Table Todos" +
            "CREATE TABLE Lists (\n" +
            "    list_id SERIAL not null,\n" +
            "    name varchar(50) not null,\n" +
            "    primary key (list_id)\n" +
            ");\n" +
            "\n" +
            "CREATE TABLE Todos (\n" +
            "    todo_id SERIAL not null,\n" +
            "    list_id int not null,\n" +
            "    completed boolean not null default false,\n" +
            "    name varchar(50) not null,\n" +
            "    primary key (todo_id),\n" +
            "    foreign key (list_id) REFERENCES Lists (list_id) on delete cascade\n" +
            ");" +
            "INSERT INTO Lists (name) VALUES\n" +
            "    (\"list1\"),\n" +
            "    (\"list2\"),\n" +
            "    (\"list3\");\n" +
            "\n" +
            "INSERT INTO Todos (list_id, name, completed) VALUES\n" +
            "    (1, \"todo1\", false),\n" +
            "    (1, \"todo2\", false),\n" +
            "    (1, \"todo3\", true),\n" +
            "    (2, \"todo4\", false),\n" +
            "    (3, \"todo5\", false);");
        await client.end();
        return result;
    }
    else {
        expect(true).to.be.false;
    }
});

it('add new list', () => {
    cy.visit(URL);
    cy.get(':nth-child(2) > input').type("test_list");
    cy.get('[type="submit"]').click();
    cy.contains("test_list");
})

it('open list', () => {
    cy.visit(URL)
    cy.get(":nth-child(1) > :nth-child(1) > a").click();
    cy.contains("Todo:")
})

it('delete list', () => {
    cy.visit(URL)
    cy.get('button').its('length').then(prev_cnt => {
        console.log(prev_cnt)
        cy.get(':nth-child(1) > :nth-child(2) > button').click();
        cy.get('button').should('have.length', prev_cnt - 1)
    })
})

it('add todo', () => {
    cy.visit(URL)
    cy.get(':nth-child(1) > :nth-child(1) > a').click()
    cy.get(':nth-child(2) > input').type("test_todo");
    cy.get('[type="submit"]').click()
    cy.contains("test_todo");
})

it('mark todo', () => {
    cy.visit(URL)
    cy.get(':nth-child(1) > :nth-child(1) > a').click();
    cy.get(':nth-child(1) > td > a').click();
    cy.get(':nth-child(1) > td > a').should('have.css', 'text-decoration', 'line-through solid rgb(0, 0, 238)');

})