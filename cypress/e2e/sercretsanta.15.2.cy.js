describe("Secret Santa tests after login spec", () => {
  // Перед каждым тестом логинимся на сайте
  beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name=email]").type("shevtma@yandex.ru");
    cy.get("input[name=password]").type("ZU9590");
    cy.get(".form-auth__button").click();
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
    cy.contains("Создать коробку");
    cy.get("div.home-page-buttons > a")
      .first()
      .should("have.attr", "href", "/box/new");
    cy.get("div.btn-main").should("be.visible", true);
    cy.get("div.btn-main").should(
      "have.text",
      "Создать коробкуСоздать коробку"
    );
  });

  it("Проверяем, что на странице есть кнопка Быстрая жеребьевка ", () => {
    cy.contains("Быстрая жеребьевка");
    cy.get("div.home-page-buttons > a")
      .last()
      .should("have.attr", "href", "/randomizer");
    cy.get("div.btn-secondary").should("be.visible", true);
    cy.get("div.btn-secondary").should(
      "have.text",
      "Быстрая жеребьевкаУзнать подопечногоЧастые вопросы"
    );
  });
});

