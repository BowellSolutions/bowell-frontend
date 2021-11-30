/// <reference types="cypress" />

// to do improve waiting for responses

describe('test homepage', () => {
  beforeEach(() => cy.visit("/"));

  it('clicks on logo', () => {
    cy.get('#header-logo').click();
    // redirect to itself
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/');
  });

  it('clicks dark mode', () => {
    // user should not have this variable in localStorage on first load
    expect(localStorage.getItem('chakra-ui-color-mode')).to.equal(null);
    const button = cy.get("button.chakra-button[aria-label='Switch to dark mode']");
    // on first click, mode should change to dark
    button.click().then(() => {
      expect(localStorage.getItem('chakra-ui-color-mode')).to.equal("dark");
    });
    // go back to light mode
    button.click().then(() => {
      expect(localStorage.getItem('chakra-ui-color-mode')).to.equal("light");
    });
  });

  it('clicks sign in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("button.chakra-button").contains("Sign in").click({force: true});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks sign up', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("button.chakra-button").contains("Sign up").click({force: true});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/register');
  });

  it('clicks dashboard - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get(".header button").contains("Dashboard").click({force: true});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('clicks profile - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifyToken');
    cy.intercept('/api/users/me/', 'success').as('getUser');
    cy.wait('@verifyToken');
    cy.wait('@getUser');
    cy.get(".header").find('button').contains("Profile").click({force: true});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/profile');
  });

  it('clicks logout - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get(".header").find('button').contains("Logout").click({force: true});
    cy.intercept('/api/auth/logout/', 'success');
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/');
  });

  it('hovers on features', () => {
    let featuresButton = cy.get("button.chakra-button").contains("Features");
    // features box, which should have display: none
    featuresButton.next().should('not.be.visible');
    // hover on features button
    featuresButton.prev().realHover();
    // features should be visible and accessible
    featuresButton.next().children().find('a').should('have.length', '5');
  });

  it('hovers on features, then click dashboard - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    // click dashboard link in features section
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().find('a').contains('Dashboard').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click dashboard - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().find('a').contains('Dashboard').click({force: true});
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('hovers on features, then click examinations - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Examinations').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click examinations - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Examinations').click({force: true});
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/examinations');
  });

  it('hovers on features, then click recordings - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Recordings').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click recordings - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Recordings').click({force: true});
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/recordings');
  });

  it('hovers on features, then clicks on profile - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Profile').click({force: true});
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    // expect redirect to login page because user is not authenticated
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then clicks on profile - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Profile').click({force: true});
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/profile');
  });

  it('hovers on features, then click more features', () => {
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('More Features').click({force: true});
    // scroll down to section with id 'features-section'
    cy.url().should('eq', 'http://localhost:3000/#features-section');
  });

  it('clicks go to dashboard button - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("#welcome-section").find("a").contains("Go To Dashboard").click();
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks go to dashboard button - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get("#welcome-section").find("a").contains("Go To Dashboard").click();
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('tests doctors carousel', () => {
    const arrowLeft = cy.get('#doctor-section').find('.carousel').find('.arrow-left');
    const arrowRight = cy.get('#doctor-section').find('.carousel').find('.arrow-right');
    // to do
    // click on arrow, expect text and image to change

  });

  it('tests patients carousel', () => {
    const arrowLeft = cy.get('#patient-section').find('.carousel').find('.arrow-left');
    const arrowRight = cy.get('#patient-section').find('.carousel').find('.arrow-right');
    // to do
    // click on arrow, expect text and image to change

  });

  it('tests phone mockup', () => {
    cy.get('#mobile-section').find('#phone-container');
    // to do
    // click on dot, expect image to change

  });

  it('searches for link, which redirects to AI experts page', () => {
    cy.get("#more-section").find("a").contains("Learn More")
      .should('have.attr', 'href', 'http://ai.ii.pw.edu.pl/');
  });

  it('clicks get started button - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400});
    cy.get("#cta-section").find("a").contains("Get Started").click();
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks get started button - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success');
    cy.intercept('/api/users/me/', 'success');
    cy.get("#cta-section").find("a").contains("Get Started").click();
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('checks for scroll to top button', () => {
    cy.get('#scroll-to-top-button').should('not.be.visible');
  });

  it('scrolls to top with button', () => {
    cy.scrollTo(0, 500);
    cy.get('#scroll-to-top-button').should('be.visible');
  });
});
