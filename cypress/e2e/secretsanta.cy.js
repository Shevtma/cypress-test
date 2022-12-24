describe("Secret Santa spec", () => {
  beforeEach(() => {
    cy.visit("https://staging.lpitko.ru/");
  });

  it('Проверяем, что на странице есть текст "тайный санта." ', () => {
    cy.get("span.txt-h3--semi").first().should("have.text", "тайный санта.");
  });
});

