/// <reference types="cypress" />


describe('test homepage', () => {
  it('clicks on logo', () => {
    cy.visit("/");
    cy.get('#header-logo').click();
    // redirect to itself
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/');
  });

  it('clicks dark mode', () => {
    cy.visit("/");
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
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');
    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Sign in").click({force: true});
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks sign up', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');
    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Sign up").click({force: true});
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/register');
  });

  it('clicks dashboard - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get(".header button").contains("Dashboard").click({force: true});
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('clicks profile - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get(".header").find('button').contains("Profile").click({force: true});
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/profile');
  });

  it('clicks logout - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/auth/logout/', 'success').as('logoutSuccess');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get(".header").find('button').contains("Logout").click({force: true});
    cy.wait('@logoutSuccess', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/');
  });

  it('hovers on features', () => {
    cy.visit("/");
    let featuresButton = cy.get("button.chakra-button").contains("Features");
    // features box, which should have display: none
    featuresButton.next().should('not.be.visible');
    // hover on features button
    featuresButton.prev().realHover();
    // features should be visible and accessible
    featuresButton.next().children().find('a').should('have.length', '5');
  });

  it('hovers on features, then click dashboard - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    // click dashboard link in features section
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().find('a').contains('Dashboard').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click dashboard - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait("@verifySuccess", {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().find('a').contains('Dashboard').click({force: true});
    cy.wait("@verifySuccess", {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('hovers on features, then click examinations - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait("@verifyFail", {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Examinations').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click examinations - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Examinations').click({force: true});
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/examinations');
  });

  it('hovers on features, then click recordings - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Recordings').click({force: true});
    // expect redirect to login page because user is not authenticated
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then click recordings - patient logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Recordings').click({force: true});
    // recordings are only visible for doctor rn (patient sees blank page)
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/recordings');
  });

  it('hovers on features, then click recordings - doctor logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', {statusCode: 200, body: {is_staff: true}}).as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Recordings').click({force: true});
    cy.wait('@getUser', {timeout: 10_000});
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/recordings');
  });

  it('hovers on features, then clicks on profile - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Profile').click({force: true});
    cy.wait('@verifyFail', {timeout: 20_000});
    // expect redirect to login page because user is not authenticated
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/login');
  });

  it('hovers on features, then clicks on profile - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('Profile').click({force: true});
    cy.wait('@verifySuccess', {timeout: 20_000});
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/dashboard/profile');
  });

  it('hovers on features, then click more features', () => {
    cy.visit("/");
    cy.get("button.chakra-button").contains("Features").realHover()
      .next().get('a').contains('More Features').click({force: true});
    // scroll down to section with id 'features-section'
    cy.url().should('eq', 'http://localhost:3000/#features-section');
  });

  it('clicks go to dashboard button - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("#welcome-section").find("a").contains("Go To Dashboard").click();
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks go to dashboard button - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("#welcome-section").find("a").contains("Go To Dashboard").click();
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('tests doctors carousel', () => {
    cy.visit("/");
    const arrowLeft = cy.get('#doctor-section').find('.carousel').find('.arrow-left');
    const arrowRight = cy.get('#doctor-section').find('.carousel').find('.arrow-right');
    // to do
    // click on arrow, expect text and image to change

  });

  it('tests patients carousel', () => {
    cy.visit("/");
    const arrowLeft = cy.get('#patient-section').find('.carousel').find('.arrow-left');
    const arrowRight = cy.get('#patient-section').find('.carousel').find('.arrow-right');
    // to do
    // click on arrow, expect text and image to change

  });

  it('tests phone mockup', () => {
    cy.visit("/");
    cy.get('#mobile-section').find('#phone-container');
    // to do
    // click on dot, expect image to change

  });

  it('searches for link, which redirects to AI experts page', () => {
    cy.visit("/");
    cy.get("#more-section").find("a").contains("Learn More")
      .should('have.attr', 'href', 'http://ai.ii.pw.edu.pl/');
  });

  it('clicks get started button - not logged in', () => {
    cy.intercept('/api/auth/token/verify/', {statusCode: 400}).as('verifyFail');

    cy.visit("/");
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.get("#cta-section").find("a").contains("Get Started").click();
    cy.wait('@verifyFail', {timeout: 10_000});
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/login');
  });

  it('clicks get started button - logged in', () => {
    cy.intercept('/api/auth/token/verify/', 'success').as('verifySuccess');
    cy.intercept('/api/users/me/', 'success').as('getUser');

    cy.visit("/");
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.get("#cta-section").find("a").contains("Get Started").click();
    cy.wait('@verifySuccess', {timeout: 10_000});
    cy.url({timeout: 20_000,}).should('eq', 'http://localhost:3000/dashboard');
  });

  it('checks for scroll to top button', () => {
    cy.visit("/");
    cy.get('#scroll-to-top-button').should('not.be.visible');
  });

  it('scrolls to top with button', () => {
    cy.visit("/");
    cy.scrollTo(0, 500);
    cy.get('#scroll-to-top-button').should('be.visible');
  });
});
