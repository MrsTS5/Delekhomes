import Chance from "chance"; // Correct import

const chance = new Chance();

/**
 * Generates a random user object with unique values.
 * Returns a Cypress-wrapped object for easy chaining.
 */
Cypress.Commands.add("generateUser", () => {
  const password = chance.string({
    length: 8,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  });

  const user = {
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state({ full: true }),
    zipCode: chance.zip(),
    phone: chance.phone({ formatted: false }),
    ssn: chance.ssn({ dashes: false }), // Removed dashes for compatibility
    email: chance.email({ domain: "test.com" }), // Ensuring uniqueness
    password: password,
    confirm: password,
  };

  return cy.wrap(user); // Cypress-friendly return
});

/**
 * Logs in a user via API and stores the access token in local storage.
 * Defaults to credentials from `data.json` if none are provided.
 */
Cypress.Commands.add("login", (email, password) => {
  cy.fixture("data.json").then((data) => {
    const userEmail = email ?? Cypress.env("USER_EMAIL") ?? data.user.Email;
    const userPassword = password ?? Cypress.env("USER_PASSWORD") ?? data.user.Password;

    cy.request("POST", "/api/users/login", {
      email: userEmail,
      password: userPassword,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      window.localStorage.setItem("accessToken", response.body.accessToken);
    });
  });
});

/**
 * Handles uncaught exceptions to prevent test failures.
 * Uses Cypress.log for improved debugging.
 */
Cypress.Commands.add("errorHandler", () => {
  Cypress.on("uncaught:exception", (err) => {
    Cypress.log({
      name: "Uncaught Exception",
      message: err.message,
      consoleProps: () => ({ error: err }),
    });
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