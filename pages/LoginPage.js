const { ZEDRUN_URL, WAIT_TIME } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");
const depositeConfig = require("../locators/Wallet");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(ZEDRUN_URL);
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
    await this.page.type(zedRunConfig.EMAIL_INPUT, email);
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
    await this.page.click(zedRunConfig.CONNECT_METAMASK);
  }

  async clickOnAuthenticateButton() {
    await this.page.click(zedRunConfig.AUTHENTICATE_BUTTON);
  }

  async clickOnAcceptButton() {
    await this.page.waitForSelector(zedRunConfig.ACCEPT_BUTTON, {
      visible: true, timeout: 0
    });
    await this.page.click(zedRunConfig.ACCEPT_BUTTON);
  }

  async clickOnMarketplaceLink() {
    await this.page.click(zedRunConfig.MARKETPLACE_LINK);
  }

  async clickOnWalletIcon() {
    await this.page.waitForSelector(depositeConfig.WALLET_ICON);
    await this.page.click(depositeConfig.WALLET_ICON);
  }

  async waitForLoginFormHidden() {
    await this.page.waitForSelector(zedRunConfig.LOGIN_POPUP, {
      hidden: true,
      timeout: 0,
    });
  }
}

module.exports = { LoginPage };
