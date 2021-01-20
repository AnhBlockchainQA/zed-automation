const { ZEDRUN_URL, WAIT_TIME } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async setPageInstance(page) {
    this.page = page;
  }

  async navigate() {
    console.log("--- Zed Run Automation Framework: Navigate to the url ---");
    try {
      await this.page.waitForLoadState();
      await this.page.goto(ZEDRUN_URL, { timeout: 0 });
      await this.page.waitForLoadState();
    } catch{
      throw new Error("Unable to launch the url ", ZEDRUN_URL);
    }
  }

  async clickOnStartButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Start Button ---"
      );
      await this.page.waitForSelector(zedRunConfig.LOGIN_START_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(zedRunConfig.LOGIN_START_BUTTON);
    } catch {
      throw new Error("Start button is not present yet!");
    }
  }

  async typeEmail(email) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Input value to email field ---"
      );
      await this.page.waitForSelector(zedRunConfig.EMAIL_INPUT, {
        visible: true,
        timeout: 0,
      });
      await this.page.type(zedRunConfig.EMAIL_INPUT, email, { delay: 100 });
    } catch{
      throw new Error("Email input field is not present yet!");
    }
  }

  async clickOnContinueButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Continue Button ---"
      );
      await this.page.waitForSelector(zedRunConfig.CONTINUE_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(zedRunConfig.CONTINUE_BUTTON);
    } catch {
      throw new Error(error);
    }
  }

  async bringToFront() {
    try {
      console.log("---- Zed Run Automation Framework: Bring page upfront ---");
      await this.page.bringToFront();
    } catch{
      throw new Error("Page instance is not ready or present!");
    }
  }

  async waitForTimeout() {
      console.log("---- Zed Run Automation Framework: Wait for timeout ---");
      await this.page.waitForTimeout(WAIT_TIME);
  }

  async checkIfWelcomeLabelPresent() {
    console.log(
      "---- Zed Run Automation Framework: Check if welcome label is present ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.WELCOME_LABEL, {
        visible: true,
        timeout: 0,
      });
    } catch{
      throw new Error("Welcome label is not present!")
    }
  }

  async clickConnectMetamaskButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Connect Metamask button ---"
      );
      await this.page.click(zedRunConfig.CONNECT_METAMASK);
    } catch{
      throw new Error("Connect Metamask button is not present or not clickable");
    }
  }

  async clickOnAuthenticateButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Authenticate Button ---"
      );
      await this.page.click(zedRunConfig.AUTHENTICATE_BUTTON);
    } catch {
      throw new Error("Authenticate button is not present or not clickable");
    }
  }
}

module.exports = { LoginPage };
