class HomePage {
    get loginButton() { return cy.get('a[href="/auth/login"]') };
    get searchInput() {return cy.get('[id=":r1:"]')}
    get startSearch() {return cy.get('[type="button"]')};
    get modeSwitch(){return cy.get('[class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3"]')};
    get searchListingPageInput(){return cy.get('[id=":r1:"]')};
    get searchListingPageButton(){return cy.contains('button', 'Start Search')}
    get bedroomSelect(){return cy.get('[aria-labelledby=":r1n:-label :r1n:"]')};
    get cityListingPageInput(){return cy.get('[id=":r1p:"]')};
    get bedroomSelection() { return cy.get('[aria-labelledby=":r2:-label :r2:"]') };
    get cityInput() { return cy.get('input[id=":r4:"]') };
    get bedroomsOption() {return cy.get('.MuiMenuItem-root')}
}
export default new HomePage();