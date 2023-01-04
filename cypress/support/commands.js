// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get(".form-auth__button").click();
  cy.contains("тайный санта.", { timeout: 10000 });
});

Cypress.Commands.add(
  "inputData",
  (input1Selector, input2Selector, btnSelector, input1Text, input2Text) => {
    cy.get(input1Selector).type(input1Text);
    cy.get(input2Selector).type(input2Text);
    cy.get(btnSelector).click();
  }
);

Cypress.Commands.add("randomEmail", (len) => {
  chrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var str = "";
  for (var i = 0; i < len; i++) {
    var pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
});
