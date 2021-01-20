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
    console.log(
      "---- Zed Run Automation Framework: Click on Accept button ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.ACCEPT_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(zedRunConfig.ACCEPT_BUTTON);
    } catch{
      throw new Error("Accept button is not present or not clickable");
    }
  }

  async clickOnWalletIcon() {
    console.log(
      "---- Zed Run Automation Framework: Click on Wallet icon ---"
    );
    try {
      await this.page.waitForSelector(walletConfig.WALLET_ICON, {
        timeout: 5000,
      });
      await this.page.click(walletConfig.WALLET_ICON);
    } catch{
      throw new Error("Wallet icon is not present or clickable");
    }
  }

  async clickOnMarketplaceLink() {
    console.log(
      "---- Zed Run Automation Framework: Click on Marketplace link ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.MARKETPLACE_LINK, {
        timeout: 5000,
      });
      await this.page.click(zedRunConfig.MARKETPLACE_LINK);
    } catch{
      throw new Error("Marketplace link is not presnet or clickable");
    }
  }

  async checkIfAvatarPresent() {
    console.log(
      "---- Zed Run Automation Framework: Check if user avatar is present ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.USER_AVATAR, {
        visible: true,
        timeout: 0,
      });
    } catch{
      throw new Error("User avatar is not present");
    }
  }

  async clickOnArrowIcon() {
    console.log("---- Zed Run Automation Framework: Click on arrow icon ---");
    try {
      await this.page.waitForSelector(zedRunConfig.ARROW_ICON, { timeout: 0 });
      await this.page.click(zedRunConfig.ARROW_ICON);
    } catch {
      throw new Error("Arrow icon is not present or clickable");
    }
  }

  async clickOnStudServiceLink() {
    console.log(
      "---- Zed Run Automation Framework: Click on Stud service ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.STUD_SERVICE_LINK, {
        timeout: 0,
      });
      await this.page.click(zedRunConfig.STUD_SERVICE_LINK);
    } catch{
      throw new Error("Stud service link is not present or clickable");
    }
  }

  async clickOnRacingLink() {
    console.log(
      "---- Zed Run Automation Framework: Click on Racing link ---"
    );
    try {
      await this.page.waitForSelector(zedRunConfig.RACING_LINK, { timeout: 0 });
      await this.page.click(zedRunConfig.RACING_LINK);
    } catch{
      throw new Error("Racing link is not present or clickable");
    }
  }

  async waitForBalanceInfoToBeShown(){
    try{
      await this.page.waitForSelector(zedRunConfig.ETH_BALANCE, {visible: true, timeout: 420000});
      await this.page.waitForSelector(zedRunConfig.ZED_BALANCE, {visible: true, timeout: 420000});
    }catch{
      throw new Error("Element is not present yet!");
    }
  }
}

module.exports = { HomePage };
