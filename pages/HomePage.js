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
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Accept button ---"
      );
      await this.page.waitForSelector(zedRunConfig.ACCEPT_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(zedRunConfig.ACCEPT_BUTTON);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickOnWalletIcon() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Wallet icon ---"
      );
      await this.page.waitForSelector(walletConfig.WALLET_ICON, {
        timeout: 5000,
      });
      await this.page.click(walletConfig.WALLET_ICON);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickOnMarketplaceLink() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Marketplace link ---"
      );
      await this.page.waitForSelector(zedRunConfig.MARKETPLACE_LINK, {
        timeout: 5000,
      });
      await this.page.click(zedRunConfig.MARKETPLACE_LINK);
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkIfAvatarPresent() {
    console.log(
      "---- Zed Run Automation Framework: Check if user avatar is present ---"
    );
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

  async clickOnArrowIcon() {
    try {
      console.log("---- Zed Run Automation Framework: Click on arrow icon ---");
      await this.page.waitForSelector(zedRunConfig.ARROW_ICON, { timeout: 0 });
      await this.page.click(zedRunConfig.ARROW_ICON);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickOnStudServiceLink() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Stud service ---"
      );
      await this.page.waitForSelector(zedRunConfig.STUD_SERVICE_LINK, {
        timeout: 0,
      });
      await this.page.click(zedRunConfig.STUD_SERVICE_LINK);
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickOnRacingLink() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Click on Racing link ---"
      );
      await this.page.waitForSelector(zedRunConfig.RACING_LINK, { timeout: 0 });
      await this.page.click(zedRunConfig.RACING_LINK);
    } catch{
      throw new Error(error);
    }
  }

  async waitForBalanceInfoToBeShown(){
    try{
      await this.page.waitForSelector(zedRunConfig.ETH_BALANCE, {visible: true, timeout: 300000});
      await this.page.waitForSelector(zedRunConfig.ZED_BALANCE, {visible: true, timeout: 300000});
    }catch{
      throw new Error("Element is not present yet!");
    }
  }
}

module.exports = { HomePage };
