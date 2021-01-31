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
} = require("../locators/MarketPlace");
const { ACCEPT_BUTTON } = require("../locators/ZedRun");
const { HORSE_LIST_SIZE, HORSE_LIST_PREDICATE } = require("../data/env");

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
      await expect(this.page).toHaveSelector(FIRST_HORSE_PREVIEW, {
        timeout: 0,
      });
      await this.page.click(FIRST_HORSE_PREVIEW);
    } catch {
      throw new Error("Horse preview is not shown");
    }
  }

  async typeCoupon(value) {
    console.log("--- Zed Run Automation Framework: Type discount coupon ---");
    try {
      await expect(this.page).toHaveSelector(COUPON_INPUT, {
        timeout: 0,
      });
      console.log("Typing value is: ", value);
      await this.page.type(COUPON_INPUT, value, {
        delay: 100,
      });
    } catch {
      throw new Error("Coupon field is not present");
    }
  }

  async clickApplyButton() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Click on Apply button ---"
      );
      await expect(this.page).toHaveSelector(APPLY_BUTTON, {
        timeout: 0,
      });
      await this.page.click(APPLY_BUTTON);
    } catch {
      throw new Error("Apply button is not present or not clickable");
    }
  }

  async verifyDiscountLabel(value) {
    console.log(
      "--- Zed Run Automation Framework: Verify if discount label shown correctly ---"
    );
    try {
      await expect(this.page).toHaveSelector(DISCOUNT_LABEL, { timeout: 0 });
      await expect(this.page).toHaveText(DISCOUNT_LABEL, value);
    } catch (error) {
      return false;
    }
  }

  async getHorsePrice() {
    console.log("--- Zed Run Automation Framework: Get the horse price ---");
    try {
      await expect(this.page).toHaveSelector(HORSE_PRICE, { timeout: 0 });
      const value = await this.page.innerText(HORSE_PRICE);
      return Number(value);
    } catch {
      throw new Error("Horse price is not present");
    }
  }

  async getHorseName() {
    console.log("--- Zed Run Automation Framework: Get horse name ---");
    try {
      await expect(this.page).toHaveSelector(HORSE_NAME, {
        timeout: 0,
      });
      const horseName = await this.page.innerText(HORSE_NAME);
      return horseName;
    } catch {
      throw new Error("Horse name is not present");
    }
  }

  async verifyDiscountPrice(value) {
    console.log(
      "--- Zed Run Automation Framework: Verify if discount price is correct ---"
    );
    // const actualValue = await this.getHorsePrice();
    try {
      await expect(this.page).toHaveSelector(HORSE_PRICE, { timeout: 0 });
      await expect(this.page).toHaveText(HORSE_PRICE, value);
    } catch {
      throw new Error(
        "Discount proce  message is not shown or assertion failed!"
      );
    }
    // if (Number(value).toFixed(2).trim() !== actualValue.toFixed(2).trim()) {
    //   console.log(
    //     "Assertion failed: Actual recalcutating price [%s] is different to expected price [%s]",
    //     Number(actualValue).toFixed(2).trim(),
    //     Number(value).toFixed(2).trim()
    //   );
    //   return false;
    // } else {
    //   return true;
    // }
  }

  async verifyErrorMessage(message) {
    try {
      console.log(
        "--- Zed Run Automation Framework: Check if error message is correct ---"
      );
      await expect(this.page).toHaveSelector(ERROR_MESSAGE, {
        timeout: 0,
      });
      await expect(this.page).toHaveText(ERROR_MESSAGE, message);
    } catch {
      throw new Error("Error message is not shown or assertion failed!");
    }
  }

  async mouseOverFirstHorse() {
    try {
      console.log(
        "--- Zed Run Automation Framework: Mouse over first horse ---"
      );
      await expect(this.page).toHaveSelector(FIRST_HORSE_PREVIEW, {
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
      await expect(this.page).toHaveSelector(HORSE_LIST, { timeout: 0 });
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
    await expect(this.page).toHaveSelector(HORSE_LIST, { timeout: 0 });
    await this.page.waitForFunction(
      ([locator, val]) => {
        return document.querySelectorAll(locator).length >= val;
      },
      [HORSE_LIST, value],
      10000,
      { timeout: 300000 }
    );
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async clickOnDownwardArrow() {
    console.log(
      "--- Zed Run Automation Framework: Click on downward arrow ---"
    );
    try {
      await expect(this.page).toHaveSelector(DOWNWARD_ARROW, { timeout: 0 });
      await this.page.click(DOWNWARD_ARROW);
    } catch {
      throw new Error("Downward arrow icon is not present");
    }
  }

  async clickOnAcceptButton() {
    console.log(
      "---- Zed Run Automation Framework: Click on Accept button ---"
    );
    try {
      await expect(this.page).toHaveSelector(ACCEPT_BUTTON, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(ACCEPT_BUTTON);
    } catch {
      throw new Error("Accept button is not present or not clickable");
    }
  }
}

module.exports = { MarketplacePage };
