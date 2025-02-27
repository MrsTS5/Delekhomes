let user, listingId;

describe('Listing', () => {
    beforeEach('Login to the web', () => {
        cy.fixture("data.json").then((data) => {
            user = data;
        });
        cy.login();
        cy.visit('/');
    });

    afterEach('Cleanup', () => {
        if (listingId) {
            cy.request({
                method: 'DELETE',
                url: `/api/estate-objects/${listingId}`,
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
                },
                failOnStatusCode: false, 
            }).then((deleteResponse) => {
                cy.log('Cleanup Response:', deleteResponse);
            });
        }
    });

    it('Create listing via API', () => {
        cy.fixture('house.jpg', 'binary').then((file) => {
            const blob = Cypress.Blob.binaryStringToBlob(file, 'image/jpg');
            const formData = new FormData();
            formData.append('title', 'House with Large Garden');
            formData.append('image', blob);
            formData.append('description', 'A lovely 3-bedroom family home located in a quiet neighborhood, close to schools and parks. The house features a spacious living area, a modern kitchen, a master bedroom with an ensuite bathroom, and a large garden perfect for family gatherings.');
            formData.append('city', 'Fresno');
            formData.append('Address','123 Maple Street');
            formData.append('state', 'CA');
            formData.append('zipCode', '90687');
            formData.append('price', '500000');
            formData.append('bedrooms', '3');
            formData.append('bathrooms', '2');
            formData.append('garage', '2');
            formData.append('sqft', '2140');
            formData.append('lotSize', '2700');
            formData.append('isPublished', 'true');
            cy.request({
                method: 'POST',
                url: '/api/estate-objects',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
                },
                body: formData,
                failOnStatusCode: false,
            }).then((response) => {
                const responseBody = response.body;
                listingId = responseBody.id;
                cy.log('Created Listing ID:', listingId);
            });
        });
    });
});