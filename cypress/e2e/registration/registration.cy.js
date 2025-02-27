import { faker } from '@faker-js/faker';
import loginPage from '../../page_objects/login.page';
import homePage from '../../page_objects/home.page';
import registrationPage from '../../page_objects/registration.page';
import verificationAuthorizationText from '../../fixtures/verification.authorization.text .json';
import user from '../../fixtures/user.credentials.json';
import dashboardPage from '../../page_objects/dashboard.page';

let email;
const password = faker.internet.password();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

describe('Registration', () => {
    before(() => {
        cy.errorHandler();
    });
    beforeEach(() => {
        cy.visit('/auth/register')
        email = faker.internet.email();
    })

    it('should not register with invalid email', () => {
        registrationPage.firstName.type(user.user.FirstName);
        registrationPage.lastName.type(user.user.LastName);
        loginPage.emailInput.type(user.user.invalidEmail);
        loginPage.passwordInput.type(user.user.Password);
        loginPage.loginButton.click();
        registrationPage.registrationEmailError.should('be.visible')
            .and('have.text', verificationAuthorizationText.invalidEmail);
        cy.url().should('include', '/auth/register');
    })

    it('Should Register as a Realtor ', () => {
        registrationPage.firstName.type(user.realtor.FirstName);
        registrationPage.lastName.type(user.realtor.LastName);
        loginPage.emailInput.type(email);
        loginPage.passwordInput.type(password);
        registrationPage.checkbox.click();
        registrationPage.submitButton.click();
        cy.url().should('include', '/dashboard/user/profile');
        registrationPage.closePopupMessage.click();
        dashboardPage.profIcon.click().should('be.visible');
        dashboardPage.profIcon
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const normalizedText = text.trim().replace(/\s+/g, ' ');
                expect(normalizedText).to.eq(`${user.realtor.FirstName} ${user.realtor.LastName}`);
            })
    })

    it('Should Register new account', () => {
        registrationPage.firstName.type(firstName);
        registrationPage.lastName.type(lastName);
        loginPage.emailInput.type(email);
        loginPage.passwordInput.type(password);
        registrationPage.submitButton.click();
        cy.url().should('include', '/dashboard/user/profile');
        dashboardPage.profIcon
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                const normalizedText = text.trim().replace(/\s+/g, ' ');
                expect(normalizedText).to.eq(`${firstName} ${lastName}`);
            });
    });
});