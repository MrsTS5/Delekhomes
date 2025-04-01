import Chance from "chance";
import loginPage from "../../fixtures/page_objects/login.page";
import homePage from "../../fixtures/page_objects/home.page";
import registrationPage from "../../fixtures/page_objects/registration.page";
import verificationAuthorizationText from "../../fixtures/verification.authorization.text.json";
import user from "../../fixtures/user.credentials.json";
import dashboardPage from "../../fixtures/page_objects/dashboard.page";

const chance = new Chance(); // Corrected instance creation

describe("Registration", () => {
    before(() => {
        cy.errorHandler();
    });

    beforeEach(() => {
        cy.visit("/auth/register");
    });

    it("Should not register with an invalid email", () => {
        registrationPage.firstName.type(user.user.FirstName);
        registrationPage.lastName.type(user.user.LastName);
        loginPage.emailInput.type(user.user.invalidEmail);
        loginPage.passwordInput.type(user.user.Password);
        loginPage.loginButton.click();

        registrationPage.registrationEmailError.should("be.visible")
            .and("have.text", verificationAuthorizationText.invalidEmail);
        cy.url().should("include", "/auth/register");
    });

    it("Should register as a Realtor", () => {
        const email = chance.email();
        const password = chance.string({ length: 10, alpha: true, numeric: true });

        registrationPage.firstName.type(user.realtor.FirstName);
        registrationPage.lastName.type(user.realtor.LastName);
        loginPage.emailInput.type(email);
        loginPage.passwordInput.type(password);
        registrationPage.checkbox.click();
        registrationPage.submitButton.click();

        cy.url().should("include", "/dashboard/user/profile");
        registrationPage.closePopupMessage.click();
        
        dashboardPage.profIcon.should("be.visible")
            .invoke("text")
            .then((text) => {
                const normalizedText = text.trim().replace(/\s+/g, " ");
                expect(normalizedText).to.eq(`${user.realtor.FirstName} ${user.realtor.LastName}`);
            });
    });

    it("Should register a new account", () => {
        const email = chance.email();
        const password = chance.string({ length: 10, alpha: true, numeric: true });
        const firstName = chance.first();
        const lastName = chance.last();

        registrationPage.firstName.type(firstName);
        registrationPage.lastName.type(lastName);
        loginPage.emailInput.type(email);
        loginPage.passwordInput.type(password);
        registrationPage.submitButton.click();

        cy.url().should("include", "/dashboard/user/profile");

        dashboardPage.profIcon.should("be.visible")
            .invoke("text")
            .then((text) => {
                const normalizedText = text.trim().replace(/\s+/g, " ");
                expect(normalizedText).to.eq(`${firstName} ${lastName}`);
            });
    });
});
