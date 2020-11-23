const zedRunConfig = require("../locators/ZedRun");
const { WAIT_TIME } = require("../data/env");

class MagicLinkPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    await this.page.bringToFront();
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async clickToTrustMe() {
    try{
      await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {timeout : WAIT_TIME});
      console.log(">>> Skip this step");
    }catch(error){
      this.page.click(zedRunConfig.TRUST_ME_BUTTON);
    }  
    this.page.waitForTimeout(WAIT_TIME);
  }

  async waitForLoggedInMessage() {
    try{
      await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {timeout : WAIT_TIME});
      return true;
    }catch(error){
      return false;
    }  
  }
}

module.exports = { MagicLinkPage };
