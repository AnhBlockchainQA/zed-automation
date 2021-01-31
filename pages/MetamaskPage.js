const {
  CLICK_GET_STARTED_BUTTON,
  CLICK_IMPORT_WALLET_BUTTON,
  FILL_TEXT_AREA_FILL_PASSPHASE,
  FILL_PASSWORD_INPUT,
  FILL_PASSWORD_CONFIRM_INPUT,
  CHECKBOX_AGREE,
  CLICK_IMPORT_BUTTON,
  CLICK_I_AGREE_BUTTON,
  CLICK_ALL_DONE,
  CLICK_CLOSE,
  CLICK_NETWORK_NAME,
  CLICK_CHOOSE_NETWORK,
} = require("../locators/Metamask");
const { WAIT_TIME } = require("../data/env");

class MetamaskPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(60000);
  }

  async bringToFront() {
    console.log("--- Zed Run Automation Framework: Bring page upfront  ---");
    await this.page.bringToFront();
  }

  async clickOnGetStartedButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Get started button ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_GET_STARTED_BUTTON, {
        timeout: 0,
      });
      await this.page.click(CLICK_GET_STARTED_BUTTON);
    } catch {
      throw new Error("Get Started button is not present or clickable");
    }
  }

  async clickOnImportWalletButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Import wallet button ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_IMPORT_WALLET_BUTTON, {
        timeout: 0,
      });
      await this.page.click(CLICK_IMPORT_WALLET_BUTTON);
    } catch {
      throw new Error("Import wallet button is not present or clickable");
    }
  }

  async clickOnIAgreeButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on I Agree button ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_I_AGREE_BUTTON, {
        timeout: 0,
      });
      await this.page.click(CLICK_I_AGREE_BUTTON);
    } catch {
      throw new Error("I Agree button is not found or not clickable!");
    }
  }

  async typeSeedPhase(seedPhase) {
    console.log("--- Zed Run Automation Framework: Type seed phase ---");
    await expect(this.page).toHaveSelector(FILL_TEXT_AREA_FILL_PASSPHASE, {
      timeout: 0,
    });
    await this.page.type(FILL_TEXT_AREA_FILL_PASSPHASE, seedPhase);
  }

  async typeNewPassword(newPassword) {
    console.log("--- Zed Run Automation Framework: Type new password ---");
    await expect(this.page).toHaveSelector(FILL_PASSWORD_INPUT, { timeout: 0 });
    await this.page.type(FILL_PASSWORD_INPUT, newPassword);
  }

  async typeConfirmPassword(confirmPassword) {
    console.log("--- Zed Run Automation Framework: Type confirm password ---");
    await expect(this.page).toHaveSelector(FILL_PASSWORD_CONFIRM_INPUT, {
      timeout: 0,
    });
    await this.page.type(FILL_PASSWORD_CONFIRM_INPUT, confirmPassword);
  }

  async checkTermsAndConditionCheckBox() {
    console.log(
      "--- Zed Run Automation Framework: Check terms and condition checkbox ---"
    );
    try {
      await expect(this.page).toHaveSelector(CHECKBOX_AGREE, { timeout: 0 });
      await this.page.check(CHECKBOX_AGREE, true);
    } catch {
      throw new Error(
        "Terms and condition checkbox is not present or clickable!"
      );
    }
  }

  async clickImportButton() {
    console.log("--- Zed Run Automation Framework: Click on Import button ---");
    try {
      await expect(this.page).toHaveSelector(CLICK_IMPORT_BUTTON, {
        timeout: 0,
      });
      await this.page.click(CLICK_IMPORT_BUTTON);
    } catch {
      throw new Error("Import button is not present or clickable!");
    }
  }

  async clickOnAllDoneButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on All Done button ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_ALL_DONE, { timeout: 0 });
      await this.page.click(CLICK_ALL_DONE);
    } catch {
      throw new Error("All done button is not present or clickable!");
    }
  }

  async clickOnCloseButton() {
    console.log("--- Zed Run Automation Framework: Click on Close button ---");
    try {
      await expect(this.page).toHaveSelector(CLICK_CLOSE, { timeout: 0 });
      await this.page.click(CLICK_CLOSE);
    } catch {
      throw new Error("Close button is not present or clickable!");
    }
  }

  async clickOnNetworkDropdown() {
    console.log(
      "--- Zed Run Automation Framework: Click on Network dropdown ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_NETWORK_NAME, {
        timeout: 0,
      });
      await this.page.click(CLICK_NETWORK_NAME);
    } catch {
      throw new Error("Network dropdown is not present or clickable!");
    }
  }

  async clickOnGoerliNetwork() {
    console.log(
      "--- Zed Run Automation Framework: Click on Goerli netword ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLICK_CHOOSE_NETWORK, {
        timeout: 0,
      });
      await this.page.click(CLICK_CHOOSE_NETWORK);
    } catch {
      throw new Error("Goerli network is not present or clickable!");
    }
  }

  async waitForTimeout() {
    console.log("--- Zed Run Automation Framework: Wait for timeout ---");
    await this.page.waitForTimeout(WAIT_TIME);
  }
}

module.exports = { MetamaskPage };
