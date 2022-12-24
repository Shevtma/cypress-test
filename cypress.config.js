const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "76ietr",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

