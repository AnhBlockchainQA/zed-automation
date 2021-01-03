const { ZEDRUN_URL, WAIT_TIME } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");
const depositeConfig = require("../locators/Wallet");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async setPageInstance(page){
    this.page = page;
  }

  async navigate() {
    console.log("--- Zed Run Automation Framework: Navigate to the url ---");
    try {
      await this.page.waitForLoadState()
      await this.page.goto(ZEDRUN_URL, { timeout: 0 });
      await this.page.waitForLoadState()
    } catch (error) {
      console.log('error:', error)
    }
   
  }

  async clickOnStartButton() {
    console.log("--- Zed Run Automation Framework: Click on Start Button ---");
    await this.page.waitForSelector(zedRunConfig.LOGIN_START_BUTTON, {visible: true, timeout: 0});
    await this.page.click(zedRunConfig.LOGIN_START_BUTTON);
  }

  async typeEmail(email) {
    console.log(
      "--- Zed Run Automation Framework: Input value to email field ---"
    );
    await this.page.waitForSelector(zedRunConfig.EMAIL_INPUT, {visible: true, timeout: 0});
    await this.page.type(zedRunConfig.EMAIL_INPUT, email, {delay: 100});
  }

  async clickOnContinueButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Continue Button ---"
    );
    await this.page.waitForSelector(zedRunConfig.CONTINUE_BUTTON, {visible: true, timeout: 0});
    await this.page.click(zedRunConfig.CONTINUE_BUTTON);
  }

  async bringToFront() {
    console.log("---- Zed Run Automation Framework: Bring page upfront ---");
    await this.page.bringToFront();
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
      console.log(">>>> Element is present");
    } catch (error) {
      console.log(">>>> Element is not present");
    }
  }

  async clickConnectMetamaskButton() {
    console.log("--- Zed Run Automation Framework: Click on Connect Metamask button ---");
    await this.page.click(zedRunConfig.CONNECT_METAMASK);
  }

  async clickOnAuthenticateButton() {
    console.log("--- Zed Run Automation Framework: Click on Authenticate Button ---");
    await this.page.click(zedRunConfig.AUTHENTICATE_BUTTON);
  }

}

module.exports = { LoginPage };
