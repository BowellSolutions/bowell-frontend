/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('test homepage', () => {
  it('checks home page', () => {
    cy.visit('/');

    cy.get('main');
  })
})
