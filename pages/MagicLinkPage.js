const zedRunConfig = require("../locators/ZedRun");
const { WAIT_TIME } = require("../data/env");

class MagicLinkPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    console.log("--- Zed Run Automation Framework: Bring page to upfront ---");
    await this.page.bringToFront();
  }

  async navigate(url) {
    console.log("--- Zed Run Automation Framework: Navigation to the url ---");
    await this.page.goto(url);
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoginFormHidden() {
    console.log("--- Zed Run Automation Framework: Wait until login form hidden ---");
    await this.page.waitForSelector(zedRunConfig.LOGIN_POPUP, {
      hidden: true,
      timeout: 0,
    });
  }

  // async clickToTrustMe() {
  //   try{
  //     await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {visible: true, timeout: 5000});
  //     console.log(">>> Skip this step");
  //   }catch(error){
  //     await this.page.waitForSelector(zedRunConfig.TRUST_ME_BUTTON, {timeout: 0});
  //     await this.page.click(zedRunConfig.TRUST_ME_BUTTON);
  //   }  
  //   this.page.waitForLoadState();
  // }

  // async waitForLoggedInMessage() {
  //   try{
  //     await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {visible: true, timeout: 0});
  //     return true;
  //   }catch(error){
  //     return false;
  //   }  
  // }

}

module.exports = { MagicLinkPage };
