class RegistrationPage {
    get firstName() { return cy.get('input[name="firstName"]') };
    get lastName() { return cy.get('input[name="lastName"]') };
    get registerButton() { return cy.contains('a', 'Register') };
    get checkbox() { return cy.get('[name="isRealtor"]') };
    get submitButton() { return cy.contains('button[type="submit"]', 'Register')}
    get registrationEmailError(){return cy.get('[id=":r3:-helper-text"]')};
    get closePopupMessage(){return cy.get('.MuiButton-textPrimary')};
}
export default new RegistrationPage();