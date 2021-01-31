const { LOGIN_POPUP } = require("../locators/ZedRun");

class MagicLinkPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(90000);
  }

  async bringToFront() {
    console.log("--- Zed Run Automation Framework: Bring page to upfront ---");
    await this.page.bringToFront();
  }

  async navigate(url) {
    console.log("--- Zed Run Automation Framework: Navigation to the url ---");
    try {
      await this.page.goto(url);
      await this.page.waitForLoadState();
    } catch {
      throw new Error(
        "Url is not valid or network timeout while loading ",
        url
      );
    }
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoginFormHidden() {
    console.log(
      "--- Zed Run Automation Framework: Wait until login form hidden ---"
    );
    await this.page.waitForSelector(LOGIN_POPUP, { hidden: true, timeout: 0 });
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }
}

module.exports = { MagicLinkPage };
