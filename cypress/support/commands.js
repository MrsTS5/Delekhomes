import Chance from "chance"; // Corrected import syntax

const chance = new Chance();

Cypress.Commands.add("generateUser", () => {
  const password = chance.string({
    length: 8,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  });

  return {
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state({ full: true }),
    zipCode: chance.zip(),
    phone: chance.phone({ formatted: false }),
    ssn: chance.ssn({ dashes: false }), // Removed dashes for better compatibility
    email: chance.email({ domain: "test.com" }), // Ensuring uniqueness
    password: password,
    confirm: password,
  };
});
Cypress.Commands.add('login', (email, password) => {
    cy.fixture('data.json').then((data) => {
        email = email || data.user.Email;
        password = password || data.user.Password;

        cy.request('POST', '/api/users/login', {
            email: email,
            password: password,
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 201]);
            window.localStorage.setItem('accessToken', response.body.accessToken);
        });
    });
});
Cypress.Commands.add('errorHandler', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception detected:', err.message);
        return false;
    });
});








// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })