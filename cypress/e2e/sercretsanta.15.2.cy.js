describe("Secret Santa tests after login spec", () => {
  var email = ""; //Cypress.env("email");
  var password = ""; //Cypress.env("password");
  var env = Cypress.env("environment");

  if (env == "staging") {
    email = "shevtma@yandex.ru";
    password = "ZU9590";
  } else {
    email = "shevtma@gmail.com";
    password = "RP7105";
  }

  // Перед каждым тестом логинимся на сайте
  beforeEach(() => {
    cy.visit("/login");
    cy.login(email, password);
  });

  it('Проверяем, что на странице есть ссылка "Коробки" ', () => {
    cy.get('a[href*="/account/boxes"]').should("be.visible");
    cy.get("div > a").first().should("have.attr", "href", "/account/boxes");
    cy.get(".header-item__text")
      .first()
      .within(() => {
        cy.contains("Коробки");
      });
  });

  it("Проверяем, что на странице есть ссылка на личный кабинет ", () => {
    cy.get('a[href*="/account"]').should("be.visible");
    cy.get("div > a:nth-of-type(2)")
      .first()
      .should("have.attr", "href", "/account");
    cy.contains("Maria");
  });

  it("Проверяем, что на странице есть кнопка Создать коробку ", () => {
    cy.get("div.home-page-buttons > a")
      .first()
      .should("have.attr", "href", "/box/new");
    cy.get("div.btn-main").should("be.visible", true);
    cy.get("div.btn-main").should(
      "have.text",
      "Создать коробкуСоздать коробку"
    );
    cy.contains("Создать коробку");
  });

  it("Проверяем, что на странице есть кнопка Быстрая жеребьевка ", () => {
    cy.get("div.home-page-buttons > a")
      .last()
      .should("have.attr", "href", "/randomizer");
    cy.get("div.btn-secondary").should("be.visible", true);
    cy.get("div.btn-secondary").should(
      "have.text",
      "Быстрая жеребьевкаУзнать подопечногоЧастые вопросы"
    );
    cy.contains("Быстрая жеребьевка");
  });

  afterEach(() => {
    cy.visit("/account");
    cy.get(".form-page__header > .base--clickable").click();
  });
});

