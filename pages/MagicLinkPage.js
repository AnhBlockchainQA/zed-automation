const zedRunConfig = require("../locators/ZedRun");
const { WAIT_TIME } = require("../data/env");

class MagicLinkPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    console.log("--- Zed Run Automation Framework: Bring page to upfront ---");
    await this.page.bringToFront();
  }

  async navigate(url) {
    console.log("--- Zed Run Automation Framework: Navigation to the url ---");
    try{
    await this.page.goto(url);
    }catch{
      throw new Error("Url is not valid or network timeout while loading ", url);
    }
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoginFormHidden() {
    console.log("--- Zed Run Automation Framework: Wait until login form hidden ---");
    await this.page.waitForSelector(zedRunConfig.LOGIN_POPUP, {
      hidden: true,
      timeout: 0,
    });
  }

}

module.exports = { MagicLinkPage };
