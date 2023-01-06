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

Cypress.Commands.add(
  "inputData",
  (input1Selector, input2Selector, btnSelector, input1Text, input2Text) => {
    if (input1Text.length > 0) {
      cy.get(input1Selector).type(input1Text);
    }
    if (input2Text.length > 0) {
      cy.get(input2Selector).type(input2Text);
    }
    cy.get(btnSelector).click();
  }
);

Cypress.Commands.add(
  "changePassword",
  (
    newpsw1FieldSelector,
    newpsw2FieldSelector,
    saveButtonSelector,
    newPassword
  ) => {
    if (newPassword.length > 0) {
      cy.get(newpsw1FieldSelector).type(newPassword);
      cy.get(newpsw2FieldSelector).type(newPassword);
    }
    cy.get(saveButtonSelector).click({ forse: true });
  }
);

