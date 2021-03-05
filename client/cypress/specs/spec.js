const URL = "http://localhost:3000/"

beforeEach(() => {
    cy.request("POST", URL + "api/todo/reset");
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
    cy.get('svg').its('length').then(prev_cnt => {
        console.log(prev_cnt)
        cy.get(':nth-child(1) > :nth-child(2) > svg').click();
        cy.get('svg').should('have.length', prev_cnt - 1)
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
    cy.get(':nth-child(2) > span > .link-button').click();
    cy.get(':nth-child(2) > span > .link-button').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get(':nth-child(2) > span > .link-button').click();
    cy.get(':nth-child(2) > span > .link-button').should('have.css', 'color', 'rgb(0, 0, 0)');
})