describe('Test 404', () => {
  it('visits page that does not exist', () => {
    cy.visit('/page-that-does-not-exist', {failOnStatusCode: false});
    cy.title().should('eq', 'Oops. Page not found!');
    const container = cy.get('#page-not-found');
    container.children().should('have.length', 4);
    container.get('h2').should('contain.text', '404');
    container.get('p')
      .first().should('contain.text', 'Page Not Found')
      .next().should('contain.text', "The page you're looking for does not seem to exist");
    container.get('button').should('contain.text', 'Go to Home').click();
    cy.url({timeout: 20_000}).should('eq', 'http://localhost:3000/');
  });
});
