describe('My First Test', () => {
    it('Visits refrigersaver', () => {
        cy.visit('http://127.0.0.1:5501/index.html')
        cy.get('#ingredient-search')
        .type('chicken')
        .should('have.value', 'chicken')

        cy.get('#searchButton').click()
    })
})
