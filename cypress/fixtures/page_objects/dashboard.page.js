class DashboardPage {
    get rolelabel() { return cy.get('a p') };
    get profileIcon(){return cy.get('header [data-testid="PersonIcon"]')}
    get logoutOption() { return cy.contains('Logout')};
    get profIcon() { return cy.get('a h6')};
}
export default new DashboardPage();