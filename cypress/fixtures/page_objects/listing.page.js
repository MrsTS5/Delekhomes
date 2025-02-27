class ListingPage{
    get titleInput() {return cy.get('[name="title"]')};
    get descriptionInput(){return cy.get('[name="description"]')};
    get cityInput() {return cy.get('[name="city"]')};
    get addressInput() {return cy.get('[name="address"]')};
    get zipCode() {return cy.get('[name="zipCode"]')};
    get priceInput() {return cy.get('[name="price"]')};
    get bedroomsInput() {return cy.get('[name="bedrooms"]')};
    get bathroomsInput() {return cy.get('[name="bathrooms"]')};
    get garageInput() {return cy.get('[name="garage"]')};
    get sqftInput() {return cy.get('[name="sqft"]')};
    get lotSize() {return cy.get('[name="lotSize"]')};
    get imageUpload() {return cy.get('[accept="image/*"]')};
    get postButton() {return cy.get('.MuiButton-root.MuiButton-containedPrimary')};
    get stateButton() {return cy.get('[role="button"]')};
    get stateOption() {return cy.get('[role="option"][data-value="CA"]')};
    get searchInput() {return cy.get('input[id=":r1:"]')};
    get listingPrice() {return cy.get('[class="MuiBox-root css-dc9kff"]')};
    get listingTitle() { return cy.get('[class="MuiTypography-root MuiTypography-h5 css-1hjjxrx"]')};
}
export default new ListingPage();