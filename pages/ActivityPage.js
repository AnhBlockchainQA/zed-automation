const activityConfig = require("../locators/Activity");
class ActivityPage {
  constructor(page) {
    this.page = page;
  }

  async getStatementInfo() {
    console.log("---- Zed Run Automation Framework: Get the statement info ---");
    await this.page.waitForSelector(activityConfig.FIRST_STATEMENT_INFO, {
      timeout: 0,
    });
    const info = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, activityConfig.FIRST_STATEMENT_INFO);
    console.log(">>>>>> Statement  info ", info);
    return info;
  }

  async checkIfBreedingInfoCorrect(...args) {
    console.log("---- Zed Run Automation Framework: Validate statement info ---");
    await this.page.waitForSelector(activityConfig.FIRST_STATEMENT_INFO, {
      timeout: 0,
    });
    let info = await this.getStatementInfo();
    const isCorrect = args.every((item) => info.includes(item));
    if (!isCorrect) {
      throw new Error(
        "Assertion failed: Statement did not contain correct information of breeding horse"
      );
    }
  }
}

module.exports = { ActivityPage };
