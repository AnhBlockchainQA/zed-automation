const { ZEDRUN_URL, WAIT_TIME } = require("../data/env");
const zedRunConfig = require("../locators/ZedRun");
const walletConfig = require("../locators/Wallet");

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    console.log("---- Zed Run Automation Framework: Bring page upfront ---");
    await this.page.bringToFront();
  }

  async clickOnAcceptButton() {
    console.log("---- Zed Run Automation Framework: Click on Accept button ---");
    await this.page.waitForSelector(zedRunConfig.ACCEPT_BUTTON, {
      visible: true, timeout: 5000
    });
    await this.page.click(zedRunConfig.ACCEPT_BUTTON);
  }

  async clickOnWalletIcon() {
    console.log("---- Zed Run Automation Framework: Click on Wallet icon ---");
    await this.page.waitForSelector(walletConfig.WALLET_ICON, {timeout: 5000});
    await this.page.click(walletConfig.WALLET_ICON);
  }

  async clickOnMarketplaceLink() {
    console.log("---- Zed Run Automation Framework: Click on Marketplace link ---");
    await this.page.waitForSelector(zedRunConfig.MARKETPLACE_LINK, {timeout: 5000});
    await this.page.click(zedRunConfig.MARKETPLACE_LINK);
  }

  async checkIfAvatarPresent(){
    console.log("---- Zed Run Automation Framework: Check if user avatar is present ---");
    try {
      await this.page.waitForSelector(zedRunConfig.USER_AVATAR, {
        visible: true,  
        timeout: 5000,
      });
      return true;
    } catch (error) {
      return false;
    }
  }


}

module.exports = { HomePage };
