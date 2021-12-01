/// <reference types="cypress" />

describe('Test login page', () => {
  it('submits login form and succeeds', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit('/login');
    // verify should fail because user is not authenticated
    cy.wait('@verifyFail', {timeout: 10_000});
    // mock api response
    cy.intercept('/api/auth/token/', 'success').as('verifyAfterLogin');
    cy.intercept('/api/users/me', {
      statusCode: 200,
      body: {
        id: 1,
        username: 'test',
        email: 'test@gmail.com',
        first_name: 'test',
        last_name: 'test',
        is_staff: true,
      }
    }).as('getUser');
    // fill in the form and submit
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('test');
      cy.get('input[name="password"]').type('password');
      cy.get('button').click();
    });
    // successful authentication
    cy.wait('@verifyAfterLogin', {timeout: 10_000});
    cy.wait('@getUser', {timeout: 10_000});
    // redirect to dashboard
    cy.url({timeout: 20000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('tries to submit but fails validation', () => {
    cy.visit('/login');
    // to do
  });

  it('submits login form and fails', () => {
    cy.visit('/login');
    // to do
  });

  it('redirects logged user to dashboard', () => {
    cy.visit('/login');
  });
});
