const testConfig = require(`../config/config`);
/* Test set - !please check config first!*/
describe(`Log in and Global feed tests`, () => {
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
    it(`Should go to the article properly`, () => {
        cy.get(`.preview-link`).first()
          .invoke(`text`).then((text1) => {
            cy.get(`.preview-link`).first().click()
            .get(`h1`)
            .invoke(`text`)
            .should((text2) => {
                expect(text1).contains(text2)
            })
          })
    })
    it(`Should add and remove comment under the article`, () => {
        cy.get(`.form-control`)
          .type(testConfig.comment)
          .get(`.btn`).contains(`Post Comment`).click()
          .get(`.card-block`).contains(`komentarz`).should(`be.visible`)
          .get(`.ion-trash-a`).click()
          .get(`.card-block`).contains(`komentarz`).should(`not.exist`) 
    })
    it(`Should add and remove to favorite post`, () => {
        cy.get(`.container > .article-meta > .btn-outline-primary`).contains(`Favorite`).should(`be.visible`)
          .get(`.container > .article-meta > .btn-outline-primary`).click()
          .get(`.container > .article-meta > .btn-primary`).contains(`Unfavorite`).should(`be.visible`)
          .get(`.container > .article-meta > .btn-primary`).click()
          .get(`.container > .article-meta > .btn-outline-primary`).contains(`Favorite`).should(`be.visible`)
    })
    it(`Should add and remove to follow the author`, () => {
        cy.get(`.container > .article-meta > .btn-outline-secondary`).contains(`Follow`).should(`be.visible`)
          .get(`.container > .article-meta > .btn-outline-secondary`).click()
          .get(`.container > .article-meta > .btn-secondary`).contains(`Unfollow`).should(`be.visible`)
          .get(`.container > .article-meta > .btn-secondary`).click()
          .get(`.container > .article-meta > .btn-outline-secondary`).contains(`Follow`).should(`be.visible`)
    })
})