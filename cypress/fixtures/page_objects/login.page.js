class LoginPage {
    get emailInput() { return cy.get('input[name="email"]') };
    get passwordInput() { return cy.get('[name="password"]') };
    get loginButton() { return cy.get('[type="submit"]')};
    get errorMessage(){return cy.get('[id=":r1:-helper-text"]')};
    get emailError(){return cy.get('[id=":r1:-helper-text"]')};
}
export default new LoginPage();