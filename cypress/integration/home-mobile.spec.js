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
 * @file: Home page - integration tests with mobile devices screen resolution
 **/

/// <reference types="cypress" />


describe('test homepage - mobile features only', () => {
  context('average mobile phone resolution', () => {
    beforeEach(() => {
      cy.viewport(360, 640);
    });

    it('clicks on hamburger menu', () => {
      cy.intercept('/api/auth/token/verify/', 'success');
      cy.visit('/');
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').should('be.visible');
      });
    });

    it('clicks on hamburger menu, then Home', () => {
      cy.visit('/');
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Home').click()
          .then(
            () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/')
          );
      });
    });

    it('clicks on hamburger menu, then Dashboard - user not logged in', () => {
      cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

      cy.visit('/');
      cy.wait('@verifyFail', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Dashboard').click().then(
          () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login')
        );
      });
    });

    it('clicks on hamburger menu, then Dashboard - user logged in', () => {
      cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');

      cy.visit('/');
      cy.wait('@verifySuccess', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Dashboard').click()
          // .then(() => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard'));
      });
    });

    it('clicks on hamburger menu, then Examinations - user not logged in', () => {
      cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

      cy.visit('/');
      cy.wait('@verifyFail', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Examinations').click().then(
          () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login')
        );
      });
    });

    it('clicks on hamburger menu, then Examinations - user logged in', () => {
      cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');

      cy.visit('/');
      cy.wait('@verifySuccess', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Examinations').click()
          // .then(() => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/examinations'));
      });
    });

    it('clicks on hamburger menu, then Recordings - user not logged in', () => {
      cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

      cy.visit('/');
      cy.wait('@verifyFail', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Recordings').click().then(
          () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login')
        );
      });
    });

    it('clicks on hamburger menu, then Recordings - user logged in', () => {
      cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');

      cy.visit('/');
      cy.wait('@verifySuccess', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Recordings').click()
          // .then(() => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/recordings'));
      });
    });

    it('clicks on hamburger menu, then Sign In - user not logged in', () => {
      cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

      cy.visit('/');
      cy.wait('@verifyFail', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Sign in').click().then(
          () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login')
        );
      });
    });

    it('clicks on hamburger menu, then Sign Up - user not logged in', () => {
      cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

      cy.visit('/');
      cy.wait('@verifyFail', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Sign up').click().then(
          () => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/register')
        );
      });
    });

    it('clicks on hamburger menu, then Profile - user logged in', () => {
      cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');

      cy.visit('/');
      cy.wait('@verifySuccess', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Profile').click()
          // .then(() => cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/profile'));
      });
    });

    it('clicks on hamburger menu, then Logout - user logged in', () => {
      cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
      cy.intercept('/api/auth/logout/', 'success').as('logoutSuccess');

      cy.visit('/');
      cy.wait('@verifySuccess', {timeout: 10_000});
      cy.get('#hamburger-menu').click().then(() => {
        cy.get('#mobile-nav').find('button').contains('Logout').click();
        cy.wait('@logoutSuccess', {timeout: 10_000});
      });
    });
  });
});
