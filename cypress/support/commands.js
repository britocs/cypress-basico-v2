
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Estela')
    cy.get('#lastName').type('Artois')
    cy.get('#email').type('estela.artois@email.com')
    cy.get('#open-text-area').type('teste commands')
    cy.contains('button', 'Enviar').click()    
})
