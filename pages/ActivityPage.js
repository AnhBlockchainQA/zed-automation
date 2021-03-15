const { FIRST_STATEMENT_INFO, VIEW_DETAILS_BUTTON } = require("../locators/Activity");
const { BREEDING_LINK } = require("../locators/ZedRun");

class ActivityPage {
  constructor(page) {
    this.page = page;
    // this.page.setDefaultTimeout(30000);
  }

  async bringToFront() {
    try {
      await this.page.bringToFront();
    } catch {
      throw new Error("Page instance is not found or not ready");
    }
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async getStatementInfo() {
    try {
      console.log(
        "---- Zed Run Automation Framework: Get the statement info ---"
      );
      await expect(this.page).toHaveSelector(FIRST_STATEMENT_INFO, {
        timeout: 0,
      });
      const info = await this.page.innerText(FIRST_STATEMENT_INFO);
      console.log(">>>>>> Statement  info ", info);
      return info;
    } catch {
      throw new Error("Statement info is not found");
    }
  }

  async checkIfStatementInfoCorrect(...args) {
    try {
      console.log(
        "---- Zed Run Automation Framework: Validate statement info ---"
      );
      await expect(this.page).toHaveSelector(FIRST_STATEMENT_INFO, {
        timeout: 10000,
      });
      let info = await this.getStatementInfo();
      console.log(" >>>>>>>>> Info: ", info);
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

  async mouseOverFirstStatementInfo() {
    console.log(
      "---- Zed Run Automation Framework: Mouse over first statement info ---"
    );
    await this.page.waitForLoadState();
    await this.page.waitForSelector(FIRST_STATEMENT_INFO, {
      timeout: 5000,
    });
    const isVisible = await this.page.isVisible(FIRST_STATEMENT_INFO);
    if (isVisible) {
      await this.page.evaluate(locator => {
         document.querySelector(locator).scrollIntoView(true, {behavior: 'smooth'});
      }, FIRST_STATEMENT_INFO);
      await this.page.hover(FIRST_STATEMENT_INFO, {timeout: 2000});
    } else {
      throw new Error("Statement is not present");
    }
  }

  async clickOnViewDetailsButton(){
    console.log(
      "---- Zed Run Automation Framework: Mouse over first statement info ---"
    );
    try{
    await this.page.waitForSelector(VIEW_DETAILS_BUTTON, {
      timeout: 0,
    });
    await this.page.click(VIEW_DETAILS_BUTTON);
  }catch{
    throw new Error('View details button is not present');
  }
}
 
}

module.exports = { ActivityPage };
