const metamaskConfig = require("../locators/Metamask");
const { WAIT_TIME } = require("../data/env");

class MetamaskPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    await this.page.bringToFront();
  }

  async clickOnGetStartedButton() {
    await this.page.click(metamaskConfig.CLICK_GET_STARTED_BUTTON);
  }

  async clickOnImportWalletButton() {
    await this.page.click(metamaskConfig.CLICK_IMPORT_WALLET_BUTTON);
  }

  async clickOnIAgreeButton() {
    await this.page.click(metamaskConfig.CLICK_I_AGREE_BUTTON);
  }

  async typeSeedPhase(seedPhase) {
    await this.page.type(metamaskConfig.FILL_TEXT_AREA_FILL_PASSPHASE, seedPhase);
  }

  async typeNewPassword(newPassword) {
    await this.page.type(metamaskConfig.FILL_PASSWORD_INPUT, newPassword);
  }

  async typeConfirmPassword(confirmPassword) {
    await this.page.type(metamaskConfig.FILL_PASSWORD_CONFIRM_INPUT, confirmPassword);
  }

  async checkTermsAndConditionCheckBox() {
    await this.page.check(metamaskConfig.CHECKBOX_AGREE, true);
  }

  async clickImportButton() {
    await this.page.click(metamaskConfig.CLICK_IMPORT_BUTTON);
  }

  async clickOnAllDoneButton() {
    await this.page.click(metamaskConfig.CLICK_ALL_DONE);
  }

  async clickOnCloseButton() {
    await this.page.click(metamaskConfig.CLICK_CLOSE);
  }

  async clickOnNetworkDropdown() {
    await this.page.click(metamaskConfig.CLICK_NETWORK_NAME);
  }

  async clickOnGoerliNetwork() {
    await this.page.click(metamaskConfig.CLICK_CHOOSE_NETWORK);
  }

  async waitForTimeout() {
    await this.page.waitForTimeout(WAIT_TIME);
  }
  
}

module.exports = { MetamaskPage };
