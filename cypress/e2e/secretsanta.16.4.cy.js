const loginData = require("../fixture/loginData.json");
const registerData = require("../fixture/registerData.json");

var goodEmail = ""; //Cypress.env("email");
var goodPassword = ""; //Cypress.env("password");
var env = Cypress.env("environment");

const input1Selector = ":nth-child(3) > .frm";
const input2Selector = ":nth-child(4) > .frm";
const btnMainSelector = ".btn-main";

function randomEmail(len) {
  const chrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";
  for (let i = 0; i < len; i++) {
    let pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
}

describe("Secret Santa. Тесты для формы логина", () => {
  const emailErrLabelSelector =
    ":nth-child(3) > .frm-wrapper__top > .frm-wrapper__top__error";
  const pwdErrLabelSelector =
    ":nth-child(4) > .frm-wrapper__top > .frm-wrapper__top__error";
  const errLabelSelector = ".hint > .txt-secondary";
  const registerHrefSelector = ".hint > .txt-secondary > a";
  const mainTextSelector = ".home-page__main-text";
  const userNameSelector =
    '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med';

  // корректные параметры подключения зависят от окружения
  if (env == "staging") {
    goodEmail = "shevtma@yandex.ru";
    goodPassword = "ZU9590";
  } else {
    goodEmail = "shevtma@gmail.com";
    goodPassword = "RP7105";
  }

  // Перед каждым тестом заходим на сайт
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Тестируем форму ввода логина (поля email, password не заполнены)", () => {
    cy.get(btnMainSelector).click();
    cy.get(emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(pwdErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (поле password не заполнено)", () => {
    cy.get(input1Selector).type(loginData[1].email);
    cy.get(btnMainSelector).click();
    cy.get(pwdErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (поле email не заполнено)", () => {
    cy.get(input2Selector).type(goodPassword);
    cy.get(btnMainSelector).click();
    cy.get(emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (пользователь не зарегистрирован)", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      loginData[0].email,
      loginData[0].password
    );
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should(
        "have.text",
        "Мы не нашли пользователя с таким email. Зарегистрироваться?"
      );
    cy.get(registerHrefSelector).should("have.attr", "href", "/register");
  });

  it("Тестируем форму ввода логина (введен неверный пароль)", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      loginData[2].email,
      loginData[2].password
    );
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Неверное имя пользователя или пароль");
  });

  it("Тестируем форму ввода логина (введен email некорректного формата - без символа @)", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      loginData[3].email,
      goodPassword
    );
    cy.get(emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Некорректный email");
    cy.get(errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (учетные данные корректны)", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      goodEmail,
      goodPassword
    );
    cy.get(mainTextSelector)
      .should("be.visible")
      .should(
        "have.text",
        "Организуй тайный обмен подарками между друзьями или коллегами"
      );
    cy.get(userNameSelector).should("be.visible").should("have.text", "Maria");
  });
});

describe("Secret Santa. Тесты для формы регистрации", () => {
  const regErrLabelSelector = ".form-auth__error > .hint > .txt-secondary";
  const regLabelSelector = ".layout-column-center > .hint > .txt-secondary";
  const enterHrefSelector = ".hint > .txt-secondary > a";
  const input2ErrLabelSelector = ".frm-wrapper__top__error";
  const successTitleSelector = ".picture-notice__title";
  const successHintSelector = ".picture-notice__hint";

  // корректные параметры подключения зависят от окружения
  if (env == "staging") {
    goodEmail = "shevtma@yandex.ru";
    goodPassword = "ZU9590";
  } else {
    goodEmail = "shevtma@gmail.com";
    goodPassword = "RP7105";
  }

  // Перед каждым тестом заходим на сайт на страницу регистрации
  beforeEach(() => {
    cy.visit("/register");
  });

  //code here cy.get('.layout-column-center > .hint > .txt-secondary')

  it("Тестируем форму регистрации. Попытка регистрации с пустыми данными", () => {
    cy.get(btnMainSelector).click();
    cy.get(regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации с пустым email", () => {
    cy.get(input1Selector).type(registerData[0].userName);
    cy.get(btnMainSelector).click();
    cy.get(regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации с пустым именем пользователя", () => {
    cy.get(input2Selector).type(registerData[1].email);
    cy.get(btnMainSelector).click();
    cy.get(regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации пользователя c некорректным email", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      registerData[2].userName,
      registerData[2].email
    );
    cy.get(input2ErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректный email");
    cy.get(regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации ранее зарегистрированного пользователя", () => {
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      "Maria",
      goodEmail
    );
    cy.get(regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Такой пользователь уже зарегистрирован. Войти?");
    cy.get(enterHrefSelector)
      .should("be.visible")
      .should("have.attr", "href", "/login");
  });

  it("Тестируем форму регистрации. Попытка регистрации пользователя (данные корректны)", () => {
    const newEmail = randomEmail(6) + "@mail.com";
    cy.log(randomEmail);
    cy.inputData(
      input1Selector,
      input2Selector,
      btnMainSelector,
      "TestUser",
      newEmail
    );
    cy.get(successTitleSelector)
      .should("be.visible")
      .should("have.text", "Письмо отправлено!");
    cy.get(successHintSelector)
      .should("be.visible")
      .should(
        "have.text",
        "Проверьте свой почтовый ящик. Вероятно, оно уже там :)"
      );
  });
});

