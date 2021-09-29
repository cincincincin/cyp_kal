const testConfig = require(`../config/config`);
/* Test set - !please check config first!*/
describe(`Log in and make changes in settings`, () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
    before(() => {
        cy.visit(testConfig.page)
        .contains(`Sign in`).click()
        .get(`.btn`).contains(`Sign in`).click()
        .get(`input[placeholder*="Email"]`)
        .type(testConfig.firstUserMail)
        .get(`input[placeholder*="Password"]`)
        .type(testConfig.firstUserPassword)
        .get(`.btn`).contains(`Sign in`).click()
        .get('.navbar-brand').click()
        .get(`a[href*="#/profile/"]`).contains(testConfig.firstUserName).should(`be.visible`)
        .get(`a[href*="#/settings"]`).contains(`Settings`).should(`be.visible`)
        .get(`a[href*="#/editor"]`).contains(`New Article`).should(`be.visible`)
    })
    it(`Should go to the settings section properly`, () => {
        cy.get(`a[href*="#/settings"]`).contains(`Settings`).click()
          .get(`h1`).contains(`Your Settings`).should(`be.visible`)
    })
    it(`Should type the URL image properly`, () => {
        cy.get(':nth-child(1) > .form-control').type(testConfig.imageURL)
    })
    it(`Should type the BIO content properly`, () => {
        cy.get(':nth-child(3) > .form-control').type(testConfig.bio)
    })

    it(`Should update and check changes in user section properly`, () => {
        cy.get(`.btn`).contains(`Update Settings`).click()
          .get(`a[href*="#/profile/"]`).contains(testConfig.firstUserName).click()
          .get('.user-img').should(`have.attr`, `src`).and(`include`,testConfig.imageURL)
    })

})