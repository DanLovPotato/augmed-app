/// <reference types="cypress" />
// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


Cypress.Commands.add('getByTestId', (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`);
});


Cypress.Commands.add('auth', (email: string, password: string) => {
    cy.getByTestId("email-input").type(email)
    cy.getByTestId("password-input").type(password)
})
Cypress.Commands.add('inputEmail', (email: string) => {
    cy.getByTestId("email-input").type(email)
})
Cypress.Commands.add('resetPassword', (password: string) => {
    cy.getByTestId("new-password-input").type(password)
    cy.getByTestId("confirm-password-input").type(password)
})


