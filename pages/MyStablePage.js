const {
  FILTER_BUTTON,
  GENDER_SPAN,
  COLT_CHECKBOX,
  STALLION_CHECKBOX,
  MY_STABLE_MALE_HORSES,
  SELECTED_MALE_HORSE,
  CUSTOM_BREED_BUTTON,
  STUD_DURATION,
  NEXT_BUTTON,
  CLOSE_BUTTON,
} = require("../locators/MyStable");
const stringUtils = require("../utils/api/stringUtils");
const { REGEX } = require("../data/env");
const {default: userEvent} = require('@testing-library/user-event')
const { screen } = require('@testing-library/dom');


class MyStablePage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(60000);
  }

  async bringToFront() {
    console.log("---- Zed Run Automation Framework: Bring page upfront ---");
    await this.page.bringToFront();
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async clickOnFilterButton() {
    console.log(
      "---- Zed Run Automation Framework: Click on Filter button ---"
    );
    try {
      await this.page.waitForSelector(FILTER_BUTTON, { timeout: 0 });
      await this.page.click(FILTER_BUTTON);
    } catch {
      throw new Error("Filter button is not present or not clickable!");
    }
  }

  async clickOnGenderLink() {
    console.log("---- Zed Run Automation Framework: Click on Gender link ---");
    try {
      await this.page.waitForSelector(GENDER_SPAN, { timeout: 0 });
      await this.page.click(GENDER_SPAN);
    } catch {
      throw new Error("Gender link is not present or clickable");
    }
  }

  async selectColtHorse(){
    console.log(
      "---- Zed Run Automation Framework: Select Colt horse ---"
    );
    try {
      await this.page.waitForSelector(COLT_CHECKBOX, {timeout: 0});
      await this.page.click(COLT_CHECKBOX);
    } catch {
      throw new Error("Colt checkbox is not present or clickable");
    }
  }


  async selectStallionHorse(){
    console.log(
      "---- Zed Run Automation Framework: Select Stallion horse ---"
    );
    try {
      await this.page.waitForSelector(STALLION_CHECKBOX, {timeout: 0});
      await this.page.click(STALLION_CHECKBOX);
    } catch {
      throw new Error("Stallion checkbox is not present or clickable");
    }
  }

  async clickOnCloseButtonOfFilterForm(){
    console.log(
      "---- Zed Run Automation Framework: Click on Close button of filter form ---"
    );
    try {
      await this.page.waitForSelector(CLOSE_BUTTON, {timeout: 0});
      await this.page.click(CLOSE_BUTTON);
    } catch {
      throw new Error("Close button is not present or clickable");
    }
  }


  async selectMaleHorseFilter() {
    console.log(
      "---- Zed Run Automation Framework: Select male horse filter with Colt and Stallion ---"
    );
    await this.selectColtHorse();
    await this.selectStallionHorse();
    await this.page.waitForLoadState();
  }

  async getListOfMaleHorsesInUserStable() {
    console.log(
      "---- Zed Run Automation Framework: Get list of male horses in user stable ---"
    );
    try {
      await this.page.waitForLoadState();
      await this.page.waitForSelector(MY_STABLE_MALE_HORSES, { timeout: 0 });
      const size = await this.page.evaluate((locator) => {
        return document.querySelectorAll(locator).length;
      }, MY_STABLE_MALE_HORSES);
      console.log(">>>>>> Size of free racing event list: ", size);
      return size;
    } catch {
      return 0;
    }
  }

  async getRandomIndexOfMaleHorsesInStable() {
    console.log(
      "--- Zed Run Automation Framework: Get random index of male horse from list ---"
    );
    let size = await this.getListOfMaleHorsesInUserStable();
    if (size > 0) {
      const index = Math.floor(Math.random() * size + 1);
      console.log(">>>>>> Index: ", index);
      return index;
    } else {
      throw new Error(
        "No male horses in user stable found! Please add horses to stable first"
      );
    }
  }

  async clickOnMaleHorseInStableWithIndex(index) {
    console.log(
      "--- Zed Run Automation Framework: Click on the male horse in stable with index [%s] ---",
      index
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_MALE_HORSE,
      index
    );
    try {
      await this.page.waitForSelector(locator, { timeout: 0 });
      await this.page.click(locator);
    } catch {
      throw new Error("Element is not present or clickable");
    }
  }

  async clickOnBreedingLinkOfHorseWithIndex(index) {
    console.log(
      "--- Zed Run Automation Framework: Click on Breeding link of male horse with index [%s] ---",
      index
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      CUSTOM_BREED_BUTTON,
      index
    );
    try {
      await this.page.waitForSelector(locator, { timeout: 0 });
      await this.page.click(locator);
    } catch {
      throw new Error("Breeding link is not present or not clickable");
    }
  }

  async setStudDuration(value) {
    console.log(
      "--- Zed Run Automation Framework: Set value of stud duration to [%s] ---",
      value
    );
    try {
      await this.page.waitForSelector(STUD_DURATION, {timeout: 0});
      await page.$(STUD_DURATION).dispatchEvent('mouseover');
      await page.$(STUD_DURATION).dispatchEvent('mousedown');
      await page.$(STUD_DURATION).dispatchEvent('mouseup');
      await page.$(STUD_DURATION).dispatchEvent('dbclick');

    } catch {
      throw new Error("Stud duration dropdown is not present");
    }
  }

  async enableNextButton() {
    console.log("--- Zed Run Automation Framework: Enable Next button ---");
    try {
      await this.page.waitForSelector(NEXT_BUTTON, { timeout: 0 });
      await this.page.evaluate((locator) => {
        document
          .evaluate(
            locator,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue.removeAttribute("disabled");
      }, NEXT_BUTTON);
    } catch {
      throw new Error("Next button is not found");
    }
  }

  async clickOnNextButton() {
    console.log("--- Zed Run Automation Framework: Click on Next button ---");
    try {
      await this.page.waitForSelector(NEXT_BUTTON, { timeout: 0 });
      await this.page.click(NEXT_BUTTON);
    } catch {
      throw new Error("Next button is not found");
    }
  }
}

module.exports = { MyStablePage };
