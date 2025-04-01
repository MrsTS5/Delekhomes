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