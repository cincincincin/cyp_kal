const testConfig = require(`../config/config`);
/* Test set - !please check config first!*/
describe(`Log in and add article tests`, () => {
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
    it(`Should go to the article section properly`, () => {
        cy.get(`a[href*="#/editor"]`).contains(`New Article`).click()
          .get(`input[placeholder*="Article Title"]`).should(`be.visible`)
          .get(`textarea[placeholder*="Write your article (in markdown)"]`).should(`be.visible`)
          .get(`input[placeholder*="What's this article about?"]`).should(`be.visible`)
          .get(`input[placeholder*="Enter tags"]`).should(`be.visible`)
    })
    it(`Should add the article properly`, () => {
        cy.get(`input[placeholder*="Article Title"]`).type(testConfig.title)
          .get(`textarea[placeholder*="Write your article (in markdown)"]`).type(testConfig.content)
          .get(`input[placeholder*="What's this article about?"]`).type(testConfig.summary)
          .get(`input[placeholder*="Enter tags"]`).type(testConfig.hashtag)
          .get(`.btn`).contains(`Publish Article`).click()
          .get(`h1`).contains(testConfig.title).should(`be.visible`)
          .get(`p`).contains(testConfig.content).should(`be.visible`)
    })
})