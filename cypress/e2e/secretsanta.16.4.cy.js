import { faker } from "@faker-js/faker";
const loginData = require("../fixture/loginData.json");
const registerData = require("../fixture/registerData.json");
const loginFieldsSelectors = require("../fixture/pages/loginPageSelectors.json");
const mainPageSelectors = require("../fixture/pages/mainPageSelectors.json");
const registerFieldsSelectors = require("../fixture/pages/registerPageSelectors.json");
const accountPageSelectors = require("../fixture/pages/accountPageSelectors.json");
const changePasswordPageSelectors = require("../fixture/pages/changePasswordPageSelectors.json");

var goodEmail = ""; //Cypress.env("email");
var goodPassword = ""; //Cypress.env("password");
var env = Cypress.env("environment");

describe("Secret Santa. Тесты для формы логина", () => {
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
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      "",
      ""
    );
    cy.get(loginFieldsSelectors.emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(loginFieldsSelectors.pwdErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (поле password не заполнено)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      loginData[1].email,
      ""
    );
    cy.get(loginFieldsSelectors.pwdErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (поле email не заполнено)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      "",
      goodPassword
    );
    cy.get(loginFieldsSelectors.emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Обязательное поле");
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (пользователь не зарегистрирован)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      loginData[0].email,
      loginData[0].password
    );
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should(
        "have.text",
        "Мы не нашли пользователя с таким email. Зарегистрироваться?"
      );
    cy.get(loginFieldsSelectors.registerHrefSelector).should(
      "have.attr",
      "href",
      "/register"
    );
  });

  it("Тестируем форму ввода логина (введен неверный пароль)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      loginData[2].email,
      loginData[2].password
    );
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Неверное имя пользователя или пароль");
  });

  it("Тестируем форму ввода логина (введен email некорректного формата - без символа @)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      loginData[3].email,
      goodPassword
    );
    cy.get(loginFieldsSelectors.emailErrLabelSelector)
      .should("be.visible", true)
      .should("have.text", "Некорректный email");
    cy.get(loginFieldsSelectors.errLabelSelector)
      .should("be.visible", true)
      .should("have.text", "В форме допущены ошибки");
  });

  it("Тестируем форму ввода логина (учетные данные корректны)", () => {
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      goodEmail,
      goodPassword
    );
    cy.get(mainPageSelectors.mainTextSelector)
      .should("be.visible")
      .should(
        "have.text",
        "Организуй тайный обмен подарками между друзьями или коллегами"
      );
    cy.get(mainPageSelectors.userNameSelector)
      .should("be.visible")
      .should("have.text", "Maria");
  });
});

describe("Secret Santa. Тесты для формы регистрации", () => {
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

  it("Тестируем форму регистрации. Попытка регистрации с пустыми данными", () => {
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      "",
      ""
    );
    cy.get(registerFieldsSelectors.regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации с пустым email", () => {
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      registerData[0].userName,
      ""
    );
    cy.get(registerFieldsSelectors.regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации с пустым именем пользователя", () => {
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      "",
      registerData[1].email
    );
    cy.get(registerFieldsSelectors.regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации пользователя c некорректным email", () => {
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      registerData[2].userName,
      registerData[2].email
    );
    cy.get(registerFieldsSelectors.emailErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректный email");
    cy.get(registerFieldsSelectors.regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Некорректное поле");
  });

  it("Тестируем форму регистрации. Попытка регистрации ранее зарегистрированного пользователя", () => {
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      "Maria",
      goodEmail
    );
    cy.get(registerFieldsSelectors.regErrLabelSelector)
      .should("be.visible")
      .should("have.text", "Такой пользователь уже зарегистрирован. Войти?");
    cy.get(registerFieldsSelectors.enterHrefSelector)
      .should("be.visible")
      .should("have.attr", "href", "/login");
  });

  it("Тестируем форму регистрации. Попытка регистрации пользователя (данные корректны)", () => {
    const newUserName = faker.internet.userName();
    const newEmail = faker.internet.email();
    cy.inputData(
      registerFieldsSelectors.userNameField,
      registerFieldsSelectors.emailField,
      registerFieldsSelectors.registerButton,
      newUserName,
      newEmail
    );
    cy.get(registerFieldsSelectors.successTitleSelector)
      .should("be.visible")
      .should("have.text", "Письмо отправлено!");
    cy.get(registerFieldsSelectors.successHintSelector)
      .should("be.visible")
      .should(
        "have.text",
        "Проверьте свой почтовый ящик. Вероятно, оно уже там :)"
      );
  });
});

describe("Secret Santa. Смена пароля пользователя", () => {
  // корректные параметры подключения зависят от окружения
  if (env == "staging") {
    goodEmail = "shevtma@yandex.ru";
    goodPassword = "ZU9590";
  } else {
    goodEmail = "shevtma@gmail.com";
    goodPassword = "RP7105";
  }

  it("Проверяем возможность смены пароля для ранее зарегистрированного пользователя", () => {
    let newPassword = faker.internet.password(8);
    cy.visit("/login");
    //login to the account with old password
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      goodEmail,
      goodPassword
    );
    //go to the account properties page
    cy.get(mainPageSelectors.userNameSelector)
      .should("be.visible")
      .should("have.text", "Maria")
      .click({ forse: true, timeout: 5000 });
    //changing password to the new
    cy.changePassword(
      changePasswordPageSelectors.newpsw1Field,
      changePasswordPageSelectors.newpsw2Field,
      changePasswordPageSelectors.saveButton,
      newPassword
    );
    cy.contains("Выйти с сайта").then(() => {
      // exit from account
      cy.get(accountPageSelectors.exitSelector).click({ forse: true });
    });

    cy.visit("/login");
    //login to the account with new password
    cy.inputData(
      loginFieldsSelectors.loginField,
      loginFieldsSelectors.passwordField,
      loginFieldsSelectors.loginButton,
      goodEmail,
      newPassword
    );
    //go to the account properties page
    cy.get(mainPageSelectors.userNameSelector)
      .should("be.visible")
      .should("have.text", "Maria")
      .click({ forse: true, timeout: 5000 });

    //changing password to the old
    cy.changePassword(
      changePasswordPageSelectors.newpsw1Field,
      changePasswordPageSelectors.newpsw2Field,
      changePasswordPageSelectors.saveButton,
      goodPassword
    );
    cy.contains("Выйти с сайта").then(() => {
      // exit from account
      cy.get(accountPageSelectors.exitSelector).click({ forse: true });
    });
  });
});

