/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Login page - integration tests
 **/

/// <reference types="cypress" />

describe('Test login page', () => {
  it('submits login form and succeeds', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit('/login');
    // verify should fail because user is not authenticated
    // cy.wait('@verifyFail', {timeout: 10_000});

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
        type: 'DOCTOR',
      }
    }).as('getUser');
    // fill in the form and submit
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('test@gmail.com');
      cy.get('input[name="password"]').type('password');
      cy.get('button').click();
    });
    // successful authentication
    cy.wait('@verifyAfterLogin', {timeout: 10_000});
    cy.wait('@getUser', {timeout: 10_000});
    // redirect to dashboard

    // cy.url({timeout: 20000}).should('eq', 'http://localhost:3000/dashboard');
  });
});
