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

  async clickOnArrowIcon(){
    console.log("---- Zed Run Automation Framework: Click on arrow icon ---");
    await this.page.waitForSelector(zedRunConfig.ARROW_ICON, {timeout: 0});
    await this.page.click(zedRunConfig.ARROW_ICON);
  }

  async clickOnStudServiceLink(){
    console.log("---- Zed Run Automation Framework: Click on Stud service ---");
    await this.page.waitForSelector(zedRunConfig.STUD_SERVICE_LINK, {timeout: 0});
    await this.page.click(zedRunConfig.STUD_SERVICE_LINK);
  }

    async clickOnBreedingLink(){
        console.log("---- Zed Run Automation Framework: Click on Breeding link ---");
        await this.page.waitForSelector(zedRunConfig.BREEDING_LINK, {timeout: 0});
        await this.page.click(zedRunConfig.BREEDING_LINK);
    }


  async clickOnRacingLink(){
    console.log("---- Zed Run Automation Framework: Click on Racing link ---");
    await this.page.waitForSelector(zedRunConfig.RACING_LINK, {timeout: 0});
    await this.page.click(zedRunConfig.RACING_LINK);
  }

  async waitUntilBalanceShown(){
    console.log("---- Zed Run Automation Framework: Wait until the balance shown ---");
    await this.page.waitForSelector(zedRunConfig.BALANCE_INFO, {timeout: 0});
  }

}

module.exports = { HomePage };
