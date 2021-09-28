const testConfig = require(`../config/config`);
/* Test set - !please check config first!*/
describe(`Log in and add article tests`, () => {
    before(() => {
        cy.visit(testConfig.page)
        .contains(`Sign in`).click()
        .get(`.btn`).contains(`Sign in`).click()
        .get(`input[placeholder*="Email"]`)
        .type(testConfig.firstUserMail)
        .get(`input[placeholder*="Password"]`)
        .type(testConfig.firstUserPassword)
        .get(`.btn`).contains(`Sign in`).click()
        .get(`.navbar-brand`).click()
        .get(`a[href*="#/profile/"]`).contains(testConfig.firstUserName).should(`be.visible`)
        .get(`a[href*="#/settings"]`).contains(`Settings`).should(`be.visible`)
        .get(`a[href*="#/editor"]`).contains(`New Article`).should(`be.visible`)
    })
    it(`Should log out properly`, () => {
        cy.get(`a[href*="#/settings"]`).contains(`Settings`).click()
          .get(`.btn`).contains(`Or click here to logout`).click()
          .get(`a[href*="#/register"]`).contains(`Sign up`).should(`be.visible`)
          .get(`a[href*="#/login"]`).contains(`Sign in`).should(`be.visible`)
    })
    it(`Should redirected to the main page properly`, () => {
        cy.get(`h1`).contains(`conduit`).should(`be.visible`)
          .wait(2000)
          .get(`.sidebar`).contains(`Popular Tags`).should(`be.visible`)
          .get(`.article-preview`).should(`be.visible`)
          .get(`span`).contains(`Read more`).should(`be.visible`)

    })
    it(`Should read the article like a unknown user properly`, () => {
        cy.get(`.preview-link`).last()
          .invoke(`text`).then((text1) => {
            cy.get(`.preview-link`).last().click()
            .get(`h1`)
            .invoke(`text`)
            .should((text2) => {
                expect(text1).contains(text2)
            })
          })
    })
})