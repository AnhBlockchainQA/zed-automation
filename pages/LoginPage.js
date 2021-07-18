const { ZEDRUN_URL, TEMP_ZEDRUN_URL } = require("../data/env");
const { WAIT_TIME } = require("../data/api"); 
const {
  LOGIN_START_BUTTON,
  EMAIL_INPUT,
  CONTINUE_BUTTON,
  WELCOME_LABEL,
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
  TEMP_CONNECT_METAMASK,
  TEMP_LOGIN_START_BUTTON,
} = require("../locators/ZedRun");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(45000);
  }

  async setPageInstance(page) {
    this.page = page;
  }

  async navigate() {
    console.log("--- Zed Run Automation Framework: Navigate to the url ---");
    try {
      await this.page.goto(ZEDRUN_URL, { timeout: 0 });
      // await this.page.goto(TEMP_ZEDRUN_URL, {timeout: 0});
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Unable to launch the url ", ZEDRUN_URL);
    }
  }

  async clickOnStartButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Start Button ---"
      );
      await this.page.waitForSelector(LOGIN_START_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(LOGIN_START_BUTTON);
    } catch {
      throw new Error("Start button is not present yet!");
    }
  }

  async typeEmail(email) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Input value to email field ---"
      );
      await expect(this.page).toHaveSelector(EMAIL_INPUT, {
        visible: true,
        timeout: 0,
      });
      await this.page.type(EMAIL_INPUT, email, { delay: 100 });
    } catch {
      throw new Error("Email input field is not present yet!");
    }
  }

  async clickOnContinueButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Continue Button ---"
      );
      await expect(this.page).toHaveSelector(CONTINUE_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(CONTINUE_BUTTON);
    } catch {
      throw new Error("Continue button is not shown or clickable");
    }
  }

  async bringToFront() {
    try {
      console.log("---- Zed Run Automation Framework: Bring page upfront ---");
      await this.page.bringToFront();
    } catch {
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
      await expect(this.page).toHaveSelector(WELCOME_LABEL, {
        visible: true,
        timeout: 0,
      });
    } catch {
      throw new Error("Welcome label is not present!");
    }
  }

  async clickConnectMetamaskButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Connect Metamask button ---"
      );
      await this.page.waitForSelector(CONNECT_METAMASK, { timeout: 0 });
      await this.page.click(CONNECT_METAMASK);
      // await this.page.waitForSelector(TEMP_CONNECT_METAMASK, { timeout: 0 });
      // await this.page.click(TEMP_CONNECT_METAMASK);
    } catch {
      throw new Error(
        "Connect Metamask button is not present or not clickable"
      );
    }
  }

  async clickOnAuthenticateButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Authenticate Button ---"
      );
      await expect(this.page).toHaveSelector(AUTHENTICATE_BUTTON, {
        timeout: 0,
      });
      await this.page.click(AUTHENTICATE_BUTTON);
    } catch {
      throw new Error("Authenticate button is not present or not clickable");
    }
  }
}

module.exports = { LoginPage };
