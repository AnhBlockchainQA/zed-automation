const metamaskConfig = require("../locators/Metamask");
const { WAIT_TIME } = require("../data/env");

class MetamaskPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    console.log("--- Zed Run Automation Framework: Bring page upfront  ---");
    await this.page.bringToFront();
  }

  async clickOnGetStartedButton() {
    console.log("--- Zed Run Automation Framework: Click on Get started button ---");
    await this.page.click(metamaskConfig.CLICK_GET_STARTED_BUTTON);
  }

  async clickOnImportWalletButton() {
    console.log("--- Zed Run Automation Framework: Click on Import wallet button ---");
    await this.page.click(metamaskConfig.CLICK_IMPORT_WALLET_BUTTON);
  }

  async clickOnIAgreeButton() {
    console.log("--- Zed Run Automation Framework: Click on I Agree button ---");
    await this.page.click(metamaskConfig.CLICK_I_AGREE_BUTTON);
  }

  async typeSeedPhase(seedPhase) {
    console.log("--- Zed Run Automation Framework: Type seed phase ---");
    await this.page.type(metamaskConfig.FILL_TEXT_AREA_FILL_PASSPHASE, seedPhase);
  }

  async typeNewPassword(newPassword) {
    console.log("--- Zed Run Automation Framework: Type new password ---");
    await this.page.type(metamaskConfig.FILL_PASSWORD_INPUT, newPassword);
  }

  async typeConfirmPassword(confirmPassword) {
    console.log("--- Zed Run Automation Framework: Type confirm password ---");
    await this.page.type(metamaskConfig.FILL_PASSWORD_CONFIRM_INPUT, confirmPassword);
  }

  async checkTermsAndConditionCheckBox() {
    console.log("--- Zed Run Automation Framework: Check terms and condition checkbox ---");
    await this.page.check(metamaskConfig.CHECKBOX_AGREE, true);
  }

  async clickImportButton() {
    console.log("--- Zed Run Automation Framework: Click on Import button ---");
    await this.page.click(metamaskConfig.CLICK_IMPORT_BUTTON);
  }

  async clickOnAllDoneButton() {
    console.log("--- Zed Run Automation Framework: Click on All Done button ---");
    await this.page.click(metamaskConfig.CLICK_ALL_DONE);
  }

  async clickOnCloseButton() {
    console.log("--- Zed Run Automation Framework: Click on Close button ---");
    await this.page.click(metamaskConfig.CLICK_CLOSE);
  }

  async clickOnNetworkDropdown() {
    console.log("--- Zed Run Automation Framework: Click on Network dropdown ---");
    await this.page.click(metamaskConfig.CLICK_NETWORK_NAME);
  }

  async clickOnGoerliNetwork() {
    console.log("--- Zed Run Automation Framework: Click on Goerli netword ---");
    await this.page.click(metamaskConfig.CLICK_CHOOSE_NETWORK);
  }

  async waitForTimeout() {
    console.log("--- Zed Run Automation Framework: Wait for timeout ---");
    await this.page.waitForTimeout(WAIT_TIME);
  }
  
}

module.exports = { MetamaskPage };
