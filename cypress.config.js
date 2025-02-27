const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qa.delekhomes.com/",
    viewportWidth: 1400,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      // Define a custom task to clear cache
      on("task", {
        clearCache() {
          console.log("Clearing cache...");
          return null; // No-op, can be expanded if needed
        },
      });
    },
  },
  screenshotsFolder: "cypress/screenshots", // Use standard Cypress folder
  screenshotOnRunFailure: true, // Enable automatic screenshots on failure
  video: true, // Enable automatic video on failure
});
