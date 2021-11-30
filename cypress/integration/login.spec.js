/// <reference types="cypress" />

describe('Test login page', () => {
  beforeEach(() => cy.visit('/login'));

  it('submits login form and succeeds', () => {
    // verify should fail because user is not authenticated
    cy.intercept('/api/auth/token/verify/', {
      statusCode: 400,
      body: {}
    });
    // fill in the form and submit
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('test');
      cy.get('input[name="password"]').type('password');
      cy.get('button').click();
    });
    // mock api response
    cy.intercept('/api/auth/token/', 'success');
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
    });
    // successful authentication
    cy.intercept('/api/auth/token/verify/', 'success');
    // redirect to dashboard
    cy.url({timeout: 20000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('tries to submit but fails validation', () => {
    // to do
  });

  it('submits login form and fails', () => {
    // to do
  });

  it('redirects logged user to dashboard', () => {
    // to do
  });
});
