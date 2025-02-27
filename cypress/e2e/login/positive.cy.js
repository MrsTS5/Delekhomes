import loginPage from '../../page_objects/login.page';
import dashboardPage from '../../page_objects/dashboard.page';
import homePage from '../../page_objects/home.page';
import verificationAuthorizationText from '../../fixtures/verification.authorization.text .json';
import user from '../../fixtures/user.credentials.json';

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should login with existing User account', () => {
        homePage.loginButton.click();
        loginPage.emailInput.type(user.user.Email);
        loginPage.passwordInput.type(user.user.Password)
        loginPage.loginButton.click();
        cy.url().should('include', '/dashboard');
        dashboardPage.profIcon.click()
            .should('be.visible')
            .and('contain', 'Anna');
    })

    it('should log out', () => {
        homePage.loginButton.click();
        loginPage.emailInput.type(user.user.Email);
        loginPage.passwordInput.type(user.user.Password);
        loginPage.loginButton.click();
        dashboardPage.profileIcon.click();
        dashboardPage.logoutOption.click();
        cy.url().should('include', '/auth/login');
    });
});