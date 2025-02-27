import loginPage from '../../page_objects/login.page';
import dashboardPage from '../../page_objects/dashboard.page';
import homePage from '../../page_objects/home.page';
import verificationAuthorizationText from '../../fixtures/verification.authorization.text .json';
import user from '../../fixtures/user.credentials.json';

describe('Negative Login Scenarios', () => {
    beforeEach(() => {
        cy.visit('/auth/login');
    });

    it('Should not login without email and password', () => {
        loginPage.loginButton.click();
        loginPage.emailError.should('have.text', verificationAuthorizationText.errorEmailMessage);
        cy.url().should('not.include', '/dashboard');
    });

    it('Should not login with invalid credentials', () => {
        loginPage.emailInput.should('be.visible');
        loginPage.emailInput.type(user.user.invalidEmail);
        loginPage.passwordInput.type(user.user.invalidPassword);
        loginPage.loginButton.click();
        loginPage.errorMessage.should('have.text', verificationAuthorizationText.invalidEmail);
        cy.url().should('not.include', '/dashboard/user/profile');
    });
});