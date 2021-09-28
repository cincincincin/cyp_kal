const testConfig = require(`../config/config`);
/* Test set - !please check config first!*/
describe(`Sign up process`, () => {
  it(`Should sign up to Conduit - properly`, () => {
    cy.visit(testConfig.page)
      .contains(`Sign up`).click()
      .get(`.btn`).contains(`Sign up`).click()
      .get(`input[placeholder*="Username"]`)
      .type(testConfig.firstUserName)
      .get(`input[placeholder*="Email"]`)
      .type(testConfig.firstUserMail)
      .get(`input[placeholder*="Password"]`)
      .type(testConfig.firstUserPassword)
      .get(`.btn`).contains(`Sign up`).click()
      .get(`.navbar-brand`).click()
      .get(`a[href*="#/profile/"]`).contains(testConfig.firstUserName).should(`be.visible`)
      .get(`a[href*="#/settings"]`).contains(`Settings`).should(`be.visible`)
      .get(`a[href*="#/editor"]`).contains(`New Article`).should(`be.visible`)
  })
})