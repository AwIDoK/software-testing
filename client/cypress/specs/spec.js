const URL = "http://localhost:3000/"

describe("normal tests", () => {
beforeEach(() => {
    cy.request({
        "url": URL + "api/todo/reset",
        "method": "POST"
    });

    cy.visit(URL);
});
it('add new list', () => {
    cy.get(':nth-child(2) > input').type("test_list");
    cy.get('[type="submit"]').click();
    cy.contains("test_list");
})

it('open list', () => {
    cy.get(":nth-child(1) > :nth-child(1) > a").click();
    cy.contains("Todo:")
})

it('delete list', () => {
    cy.get('svg').its('length').then(prev_cnt => {
        cy.get(':nth-child(1) > :nth-child(2) > svg').click();
        cy.get('svg').should('have.length', prev_cnt - 1)
    })
})

it('add todo', () => {
    cy.get(':nth-child(1) > :nth-child(1) > a').click()
    cy.get(':nth-child(2) > input').type("test_todo");
    cy.get('[type="submit"]').click()
    cy.contains("test_todo");
})

it('mark todo', () => {
    cy.get(':nth-child(1) > :nth-child(1) > a').click();
    cy.get(':nth-child(2) > span > .link-button').click();
    cy.get(':nth-child(2) > span > .link-button').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get(':nth-child(2) > span > .link-button').click();
    cy.get(':nth-child(2) > span > .link-button').should('have.css', 'color', 'rgb(0, 0, 0)');
})
});

describe("auth tests", () => {
    it('successful', () => {
        cy.request(
            {
                url: URL + "api/todo",
                auth: {
                    username: 'admin',
                    password: 'admin'
                },
                failOnStatusCode: false
            }
        ).should((response) => { expect(response.status).to.eq(200)});
    })
    it('fail', () => {
        cy.request(
            {
                url: URL + "api/todo",
                auth: {
                    username: 'admin',
                    password: 'admin1'
                },
                failOnStatusCode: false
            }
        ).should((response) => { expect(response.status).to.eq(401)});
    })
});