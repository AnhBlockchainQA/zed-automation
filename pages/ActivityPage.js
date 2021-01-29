const { FIRST_STATEMENT_INFO } = require("../locators/Activity");
const { BREEDING_LINK } = require("../locators/ZedRun");
class ActivityPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(60000);
  }

  async bringToFront(){
    try{
    await this.page.bringToFront();
    }catch{
      throw new Error("Page instance is not found or not ready");
    }
  }

  async waitForLoadState(){
    await this.page.waitForLoadState();
  }

  async getStatementInfo() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Get the statement info ---"
      );
      await this.page.waitForSelector(FIRST_STATEMENT_INFO, {
        timeout: 0,
      });
      const info = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, FIRST_STATEMENT_INFO);
      console.log(">>>>>> Statement  info ", info);
      return info;
    } catch{
      throw new Error("Statement info is not found");
    }
  }

  async checkIfStatementInfoCorrect(...args) {
    try {
      console.log(
        "---- Zed Run Automation Framework: Validate statement info ---"
      );
      await this.page.waitForSelector(FIRST_STATEMENT_INFO, {
        timeout: 0,
      });
      let info = await this.getStatementInfo();
      const isCorrect = args.every((item) => info.includes(item));
      if (!isCorrect) {
        throw new Error(
          "Assertion failed: Statement did not contain correct information related to the horse"
        );
      }
    } catch {
      throw new Error("Statement is not present!");
    }
  }

  async clickOnBreedingLink(){
    console.log("---- Zed Run Automation Framework: Click on Breeding link ---");
    try {
      await this.page.waitForSelector(BREEDING_LINK, { timeout: 0 });
      await this.page.click(BREEDING_LINK);
    } catch {
      throw new Error("Breeding link is not shown!");
    }
  }
}

module.exports = { ActivityPage };
