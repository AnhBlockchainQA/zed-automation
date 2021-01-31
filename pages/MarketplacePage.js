const {
  FIRST_HORSE_PREVIEW,
  DOWNWARD_ARROW,
  COUPON_INPUT,
  APPLY_BUTTON,
  DISCOUNT_LABEL,
  HORSE_PRICE,
  HORSE_NAME,
  ERROR_MESSAGE,
  HORSE_LIST,
    LIST_HORSE,
    MARKET_PLACE_TAB
} = require("../locators/MarketPlace");
const {
  ACCEPT_BUTTON
} = require("../locators/ZedRun");
const {
  HORSE_LIST_SIZE,
  HORSE_LIST_PREDICATE,
} = require("../data/env");

class MarketplacePage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(120000);
  }

  async clickFirstHorsePreview() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on First horse preview ---"
      );
      await this.page.waitForSelector(FIRST_HORSE_PREVIEW, {
        timeout: 0,
      });
      await this.page.click(FIRST_HORSE_PREVIEW);
    } catch (error) {
      throw new Error(error);
    }
  }

  async typeCoupon(value) {
    console.log("--- Zed Run Automation Framework: Type discount coupon ---");
    try {
      await this.page.waitForSelector(COUPON_INPUT, {
        timeout: 0,
      });
      console.log("Typing value is: ", value);
      await this.page.type(COUPON_INPUT, value, {
        delay: 100,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async clickApplyButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Apply button ---"
      );
      await this.page.waitForSelector(APPLY_BUTTON, {
        timeout: 0,
      });
      await this.page.click(APPLY_BUTTON);
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyDiscountLabel(value) {
    console.log(
      "--- Zed Run Automation Framework: Verify if discount label shown correctly ---"
    );
    try {
      // await this.page.waitForSelector(DISCOUNT_LABEL, {
      //   visible: true,
      //   timeout: 0,
      // });
      const discountText = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, DISCOUNT_LABEL);
      console.log(discountText);
      console.log("---- return verifyDiscountLabel")
      return discountText.includes(value);
    } catch (error) {
      return false;
    }
  }

  async getHorsePrice() {
    console.log("--- Zed Run Automation Framework: Get the horse price ---");
    try {
      await this.page.waitForSelector(HORSE_PRICE, {
        timeout: 0,
      });
      const value = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, HORSE_PRICE);
      console.log(">>>>>>>> Horse price is: ", value);
      return Number(value);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getHorseName() {
    console.log("--- Zed Run Automation Framework: Get horse name ---");
    try {
      await this.page.waitForSelector(HORSE_NAME, {
        timeout: 0,
      });
      const horseName = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, HORSE_NAME);
      console.log(">>>>>>>> Horse name is: ", horseName);
      return horseName;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyDiscountPrice(value) {
    console.log(
      "--- Zed Run Automation Framework: Verify if discount price is correct ---"
    );
    const actualValue = await this.getHorsePrice();
    if (Number(value).toFixed(2).trim() !== actualValue.toFixed(2).trim()) {
      console.log(
        "Assertion failed: Actual recalcutating price [%s] is different to expected price [%s]",
        Number(actualValue).toFixed(2).trim(),
        Number(value).toFixed(2).trim()
      );
      return false;
    } else {
      return true;
    }
  }

  async verifyErrorMessage(message) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Check if error message is correct ---"
      );
      await this.page.waitForSelector(ERROR_MESSAGE, {
        timeout: 0,
      });
      const error = await this.page.evaluate((locator) => {
        return document.querySelector(locator).innerText;
      }, ERROR_MESSAGE);
      return error.includes(message);
    } catch (error) {
      throw new Error(error);
    }
  }

  async mouseOverFirstHorse() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Mouse over first horse ---"
      );
      await this.page.waitForSelector(FIRST_HORSE_PREVIEW, {
        visible: true,
        timeout: 0,
      });
      await this.page.hover(FIRST_HORSE_PREVIEW);
    } catch {
      throw new Error("Waiting time is over but element is not present yet!");
    }
  }

  async getNumberOfHorses() {
    console.log(
      "--- Zed Run Automation Framework: Get number of horse in list ---"
    );
    try {
      await this.page.waitForSelector(HORSE_LIST, { timeout: 0 });
      const numberOfHorses = await this.page.evaluate((locator) => {
        return document.querySelectorAll(locator).length;
      }, HORSE_LIST);
      console.log("Number of horses is [%s]", numberOfHorses);
      return numberOfHorses;
    } catch {
      return -1;
    }
  }

  async waitUntilHorseListLoaded(value) {
    console.log(
      "--- Zed Run Automation Framework: Wait until horse list loaded ---"
    );
    await this.page.waitForFunction(
      ([locator, val]) => {
        return document.querySelectorAll(locator).length == val;
      },
      [HORSE_LIST,value],
      10000,
      { timeout: 300000 }
    );
  }

  async waitForLoadState(){
    await this.page.waitForLoadState();
  }

  async clickOnDownwardArrow() {
    console.log(
      "--- Zed Run Automation Framework: Click on downward arrow ---"
    );
    try {
      await this.page.waitForSelector(DOWNWARD_ARROW, { timeout: 0 });
      await this.page.click(DOWNWARD_ARROW);
    } catch {
      throw new Error("Downward arrow icon is not present");
    }
  }

  async clickOnAcceptButton(){
    console.log(
      "---- Zed Run Automation Framework: Click on Accept button ---"
    );
    try {
      await this.page.waitForSelector(ACCEPT_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(ACCEPT_BUTTON);
    } catch {
      throw new Error("Accept button is not present or not clickable");
    }
  }

    async validateRaceHorseExisting () {
        console.log("--- Zed Run Automation Framework: Validate the Marketplace to see a racehorse existing ---");
       try {
           await this.page.waitForSelector(LIST_HORSE, {timeout : 20000});
           const totalHorse = await this.page.evaluate((locator) => {
               return document.querySelectorAll(locator).length;
           }, LIST_HORSE);
           await expect(totalHorse).toBeGreaterThan(0);
       } catch {
           throw new Error("There is no racehorse display on Marketplace Page")
       }

    }

    async selectMarketplaceTab() {
        console.log("--- Zed Run Automation Framework: Select the Marketplace tab on Marketplace page ---");
        try {
            await this.page.waitForSelector(MARKET_PLACE_TAB, {timeout : 0});
            await this.page.click(MARKET_PLACE_TAB);
        }
        catch {
            throw new Error("Marketplace Tab is not present or not clickable");
        }
    }

  // async waitUntilHorseListLoaded() {
  //   console.log(
  //     "--- Zed Run Automation Framework: Wait until horse list loaded ---"
  //   );
  //   try {
  //     await this.page.waitForFunction(
  //       ([locator, attribute]) => {
  //         Array.from(document.querySelectorAll(locator))
  //           .map(function (e) {
  //             return e.getAttribute("class");
  //           })
  //           .every((v) => v.includes(attribute));
  //       },
  //       [HORSE_LIST, HORSE_LIST_ATTRIBUTE],
  //       5000,
  //       { timeout: 100000 }
  //     );
  //   } catch {
  //     throw new Error(
  //       "Waiting time is over but size of horse list is still incorrect!"
  //     );
  //   }
  // }

  // async isHorsesListNotEmpty(){
  //   console.log(
  //     "--- Zed Run Automation Framework: Check if horses list is not empty ---"
  //   );
  //   const isHorseExisted = await this.page.evaluate(locator => {
  //     return Array.from(document.querySelectorAll(locator)).length > 0
  //   }, HORSE_LIST);
  //   return isHorseExisted;
  // }
}

module.exports = { MarketplacePage };
