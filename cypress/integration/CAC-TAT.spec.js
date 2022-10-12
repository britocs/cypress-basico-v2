// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

//import { functionsIn } from "cypress/types/lodash"

//describe: define suite de testes


//executa o acesso a pagina no inicio de todos os testes
describe('Central de Atendimento ao Cliente TAT', function() {
  
    beforeEach(function()  {
        cy.visit('./src/index.html')        
    })

    //it: define um caso de teste
    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        
    })

    //preenche os dados do formulário e valida mensagem de sucesso
    it('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Estela').click()
        cy.get('#lastName').type('Artois').click()
        cy.get('#email').type('estela.artois@email.com').click()
        cy.get('#open-text-area').type('teste para criar novo usuário').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    //exercicio extra 1 
    //executa mais rapido o teste com o delay sobrescrito
    it('Preenche os campos obrigatórios e envia o formulário com delay no texto', function(){
        const longText = 'Fans of the movie Back to the Future or classic car lovers will get a belly laugh from this random filler copy generator. Select up to 9 paragraphs, sentences, or words. You can enter higher numbers, but the page will crash if you do not limit your aspirations.'
        cy.get('#firstName').type('Doctor').click()
        cy.get('#lastName').type('Brown').click()
        cy.get('#email').type('doctor.brown@email.com').click()
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    //exercicio extra 2 
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Howard').click()
        cy.get('#lastName').type('Wollowitz').click()
        cy.get('#email').type('Howard.Wollowitz_email.com').click()
        cy.get('#open-text-area').type('teste email invalido').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //exercicio extra 3
    it('Valida que campo telefone continua vazio quando preenchido com valores não numéricos', function(){

        cy.get('#phone')
            .type('abcdefhij').click()
            .should('have.value', '')        
    })

    //exercicio extra 4
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Amy').click()
        cy.get('#lastName').type('Fowler').click()
        cy.get('#email').type('amy.fowler@email.com').click()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste telefone obrigatorio').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')        
    })

    //exercicio extra 5
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Amy').clear().should('have.value','')
        cy.get('#lastName').type('Fowler').clear().should('have.value','')
        cy.get('#email').type('amy.fowler@email.com').clear().should('have.value','')
        cy.get('#phone').type('56781234').clear().should('have.value','')
        cy.get('#open-text-area').type('teste clear').clear().should('have.value','')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')        
    })

    //exercicio extra 6
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })
   
    //exercicio extra 7 - comandos customizados
    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    
    //ex. extra - select
    it('Seleciona um produto YouTube por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu valor (value)', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })   
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example').as('sampleFile')
        cy.get('input[type=file]')
            .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){        
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')   

        // ou informa o elemento onde está o link pelo id 
        //cy.get('#privacy a').should...
    })   
    
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){        
       cy.get('#privacy a')
        .invoke('removeAttr', 'target')   
        .click() 
        cy.contains('Talking About Testing').should('be.visible')
    }) 

})