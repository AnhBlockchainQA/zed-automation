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
      await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {visible: true, timeout: 5000});
      console.log(">>> Skip this step");
    }catch(error){
      await this.page.waitForSelector(zedRunConfig.TRUST_ME_BUTTON, {timeout: 0});
      await this.page.click(zedRunConfig.TRUST_ME_BUTTON);
    }  
    this.page.waitForLoadState();
  }

  async waitForLoggedInMessage() {
    try{
      await this.page.waitForSelector(zedRunConfig.LOGIN_SUCESSFUL_MESSAGE, {visible: true, timeout: 0});
      return true;
    }catch(error){
      return false;
    }  
  }

}

module.exports = { MagicLinkPage };
