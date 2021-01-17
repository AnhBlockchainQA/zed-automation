const { ZEDRUN_URL, WAIT_TIME } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");
const depositeConfig = require("../locators/Wallet");

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
    } catch (error) {
      throw new Error(error);
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
    } catch (error) {
      throw new Error(error);
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
    } catch (error) {
      throw new Error(error);
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async bringToFront() {
    try {
      console.log("---- Zed Run Automation Framework: Bring page upfront ---");
      await this.page.bringToFront();
    } catch (error) {
      throw new Error(error);
    }
  }

  async waitForTimeout() {
    try {
      console.log("---- Zed Run Automation Framework: Wait for timeout ---");
      await this.page.waitForTimeout(WAIT_TIME);
    } catch (error) {
      throw new Error(error);
    }
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
      console.log(">>>> Element is present");
    } catch (error) {
      console.log(">>>> Element is not present");
    }
  }

  async clickConnectMetamaskButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Connect Metamask button ---"
      );
      await this.page.click(zedRunConfig.CONNECT_METAMASK);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickOnAuthenticateButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Authenticate Button ---"
      );
      await this.page.click(zedRunConfig.AUTHENTICATE_BUTTON);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { LoginPage };
