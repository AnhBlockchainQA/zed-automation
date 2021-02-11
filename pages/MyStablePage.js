const {
  FILTER_BUTTON,
  GENDER_SPAN,
  COLT_CHECKBOX,
  STALLION_CHECKBOX,
  MY_STABLE_MALE_HORSES,
  SELECTED_MALE_HORSE,
  CUSTOM_BREED_BUTTON,
  // STUD_DURATION,
  NEXT_BUTTON,
  CLOSE_BUTTON,
  // SEVEN_DAYS_OPTION,
  // ONE_DAY_OPTION,
  // THREE_DAYS_OPTION,
  TOTAL_THOROUGHBREDS,
  NEWBORN_LIST,
  SELECTED_NEWBORN,
  NEWBORN_HORSE_NAME_INPUT,
  NEWBORN_NAME_CHECKBOX,
  HORSE_NOMINATION_CONFIRM_BUTTON,
  LOADING_ICON,
  NEWBORN_UPDATE_HORSENAME,
  OKAY_BUTTON,
  NEWBORN_EDIT_FORM,
  MY_STABLE_LOADING_ICON,
  MY_STABLE_LAST_HORSE,
  SEARCH_INPUT,
  MY_STABLE_HORSE_LIST,
  CUSTOM_HORSE,

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
  SEVEN_DAYS_OPTION,
  ONE_DAY_OPTION,
  THREE_DAYS_OPTION,
  TOTAL_THOROUGHBREDS,
  NUMBER_HORSE,
} = require("../locators/MyStable");
const stringUtils = require("../utils/api/stringUtils");
const { REGEX } = require("../data/env");
const { HORSE_LIST } = require("../locators/MarketPlace");
const { THRESHOLD } = require("../data/api");

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

  async reloadPage() {
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  async clickOnFilterButton() {
    console.log(
      "---- Zed Run Automation Framework: Click on Filter button ---"
    );
    try {
      await expect(this.page).toHaveSelector(FILTER_BUTTON, { timeout: 0 });
      await this.page.click(FILTER_BUTTON);
    } catch {
      throw new Error("Filter button is not present or not clickable!");
    }
  }

  async clickOnGenderLink() {
    console.log("---- Zed Run Automation Framework: Click on Gender link ---");
    try {
      await expect(this.page).toHaveSelector(GENDER_SPAN, { timeout: 0 });
      await this.page.click(GENDER_SPAN);
    } catch {
      throw new Error("Gender link is not present or clickable");
    }
  }

  async selectColtHorse() {
    console.log("---- Zed Run Automation Framework: Select Colt horse ---");
    try {
      await expect(this.page).toHaveSelector(COLT_CHECKBOX, { timeout: 0 });
      await this.page.check(COLT_CHECKBOX);
    } catch {
      throw new Error("Colt checkbox is not present or clickable");
    }
  }

  async selectStallionHorse() {
    console.log("---- Zed Run Automation Framework: Select Stallion horse ---");
    try {
      await expect(this.page).toHaveSelector(STALLION_CHECKBOX, { timeout: 0 });
      await this.page.check(STALLION_CHECKBOX);
    } catch {
      throw new Error("Stallion checkbox is not present or clickable");
    }
  }

  async clickOnCloseButtonOfFilterForm() {
    console.log(
      "---- Zed Run Automation Framework: Click on Close button of filter form ---"
    );
    try {
      await expect(this.page).toHaveSelector(CLOSE_BUTTON, { timeout: 0 });
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
      await expect(this.page).toHaveSelector(MY_STABLE_MALE_HORSES, {
        timeout: 0,
      });
      const size = await this.page.evaluate((locator) => {
        return document.document.evaluate(
          locator,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        ).snapshotLength;
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
      await expect(this.page).toHaveSelector(locator, { timeout: 0 });
      const element = await this.page.$(locator);
      await element.scrollIntoViewIfNeeded();
      await element.click();
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
      await expect(this.page).toHaveSelector(locator, { timeout: 0 });
      await this.page.click(locator);
    } catch {
      throw new Error("Breeding link is not present or not clickable");
    }
  }

  async setStudDuration() {
    console.log(
      "--- Zed Run Automation Framework: Set value of stud duration to [%s] ---",
      value
    );
    try {
      const select = await this.page.waitForSelector(':text("Set duration")');
      await select.click();
      const option = await this.page.waitForSelector(
        ':text("7 Days"):below(:text("Set duration"))',
        { state: "attached" }
      );
      await option.scrollIntoViewIfNeeded();
      await option.click();
    } catch {
      throw new Error(
        "Stud duration dropdown is not present or option did not exist"
      );
    }
  }

  async clickOnNextButton() {
    console.log("--- Zed Run Automation Framework: Click on Next button ---");
    try {
      await expect(this.page).toHaveSelector(NEXT_BUTTON, { timeout: 0 });
      await this.page.click(NEXT_BUTTON);
    } catch {
      throw new Error("Next button is not found");
    }
  }

  async validateRaceHorseDisplayCorrectly() {
    const getCurrentThoroughbreds = await this.page.innerText(
      TOTAL_THOROUGHBREDS
    );
    console.log(
      "Currently, the Thoroughbreds is: [%s]",
      getCurrentThoroughbreds
    );

    await this.page.waitForSelector(NUMBER_HORSE, { timeout: 20000 });
    const getListOfRaceHorseDisplay = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, NUMBER_HORSE);
    console.log(
      "Currently, the number of racehorse displays: [%s]",
      getListOfRaceHorseDisplay
    );

    if (parseInt(getCurrentThoroughbreds) <= 10) {
      expect(parseInt(getListOfRaceHorseDisplay)).toEqual(
        parseInt(getCurrentThoroughbreds)
      );
    } else {
      expect(parseInt(getListOfRaceHorseDisplay)).toBeLessThanOrEqual(
        parseInt(getCurrentThoroughbreds)
      );
    }
  }

  async getListOfNewbornHorse() {
    console.log(
      "--- Zed Run Automation Framework: Get list of newborn horse ---"
    );
    try {
      await this.page.waitForSelector(NEWBORN_LIST, { timeout: 0 });
      return this.page.$$eval(NEWBORN_LIST, (items) => items.length);
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async getRandomIndexOfNewBornHorse() {
    let size = await this.getListOfNewbornHorse();
    if (size > 0) {
      return Math.floor(Math.random() * size + 1);
    } else {
      throw new Error("No newborn horse is found in user stable!");
    }
  }

  async clickOnNewbornHorseWithIndex(index) {
    console.log(
      "--- Zed Run Automation Framework: Click on the newborn horse with index [%s] ---",
      index
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_NEWBORN,
      index
    );
    try {
      await this.page.waitForSelector(locator, { timeout: 0 });
      await this.page.click(locator);
    } catch {
      throw new Error("Newborn horse name is not present or not clickable");
    }
  }

  async isElementVisible(locator) {
    console.log(" >>>>>> Locator: [%s]", locator);
    const visible = await this.page.isVisible(locator);
    return visible;
  }

  async scrollToLastHorseInStable() {
    await this.page.waitForLoadState();
    await this.page.evaluate(() => {
      window.scrollTo(
        0,
        document.querySelector(MY_STABLE_LAST_HORSE).scrollHeight,
        { behavior: "smooth" }
      );
    });
    await this.page.waitForLoadState("networkidle");
  }

  async waitUntilHorseListLoaded() {
    console.log(
      "--- Zed Run Automation Framework: Wait until horse list loaded completely ---"
    );
    await this.page.waitForSelector(MY_STABLE_LOADING_ICON, {
      state: "hidden",
      timeout: 10000,
    });
  }

  async scrollToNewbornHorseWithIndex(index, threshold) {
    console.log(
      "--- Zed Run Automation Framework: Scroll to the newborn horse ---"
    );
    let i = 0;
    let isVisible = false;
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_NEWBORN,
      index
    );
    console.log(" >>>>>>> Custom newborn horse : [%s]", locator);
    try {
      do {
        isVisible = await this.isElementVisible(locator);
        if (isVisible === true) {
          break;
        } else {
          await this.scrollToLastHorseInStable();
          await this.page.waitForLoadState();
          i++;
        }
      } while (i < threshold && isVisible === false);
      if (isVisible) {
        await this.page.evaluate((selector) => {
          document
            .evaluate(
              selector,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            )
            .singleNodeValue.scrollIntoView(true, { behavior: "smooth" });
        }, locator);
      }
    } catch {
      throw new Error("Selector is invalid or no matching element found");
    }
  }

  async waitUntilEditFormLoaded() {
    console.log(
      "--- Zed Run Automation Framework: Wait until horse name edit form loaded ---"
    );
    let isHidden = true;
    let i = 0;
    do {
      isHidden = await page.isHidden(NEWBORN_EDIT_FORM, { timeout: 5000 });
      if (isHidden === true) {
        break;
      } else {
        i++;
        await this.page.waitForLoadState();
      }
    } while (isHidden === false && i < THRESHOLD);
  }

  async clickOnOkayButton() {
    console.log("--- Zed Run Automation Framework: Click on Okay button ---");
    try {
      await this.page.waitForLoadState();
      await this.page.waitForSelector(OKAY_BUTTON, {
        timeout: 0,
      });
      await this.page.evaluate((locator) => {
        document.querySelector(locator).click();
      }, OKAY_BUTTON);
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Okay button is not present or not clickable");
    }
  }

  async enterNewbornHorseName(name) {
    console.log(
      "--- Zed Run Automation Framework: Enter newborn horse name [%s] ---",
      name
    );
    try {
      await this.page.waitForSelector(NEWBORN_HORSE_NAME_INPUT, { timeout: 0 });
      await this.page.type(NEWBORN_HORSE_NAME_INPUT, "");
      await this.page.type(NEWBORN_HORSE_NAME_INPUT, name, { delay: 100 });
    } catch {
      throw new Error("Horse name input field is not present");
    }
  }

  async checkOnCheckbox() {
    console.log("--- Zed Run Automation Framework: Check on the checkbox ---");
    try {
      await this.page.waitForSelector(NEWBORN_NAME_CHECKBOX, { timeout: 0 });
      await this.page.click(NEWBORN_NAME_CHECKBOX);
    } catch {
      throw new Error("Checkbox is not present");
    }
  }

  async clickOnConfirmButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button ---"
    );
    try {
      await this.page.waitForSelector(HORSE_NOMINATION_CONFIRM_BUTTON, {
        timeout: 0,
      });
      await this.page.click(HORSE_NOMINATION_CONFIRM_BUTTON);
    } catch {
      throw new Error("Confirm button is not present or not clickable");
    }
  }

  async waitUntilLoadingIconHidden() {
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button ---"
    );
    try {
      await this.page.waitForLoadState();
      await this.page.waitForSelector(LOADING_ICON, {
        hidden: true,
        timeout: 0,
      });
    } catch {
      throw new Error("Loading icon is still present");
    }
  }

  async searchForHorse(horse) {
    console.log(
      "--- Zed Run Automation Framework: Search horse with name [%s] ---",
      horse
    );
    try {
      await this.page.waitForSelector(SEARCH_INPUT, { timeout: 0 });
      await this.page.type(SEARCH_INPUT, horse, { delay: 50 });
      await this.page.waitForLoadState();
    } catch {
      throw new Error("Search input is not present");
    }
  }

  async verifySearchResultContainHorse(name) {
    console.log(
      "--- Zed Run Automation Framework: Verify that search result contains horse with name [%s] ---",
      name
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.TEXT,
      CUSTOM_HORSE,
      name
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    const actualName = await this.page.innerText(locator);
    if (!actualName.includes(name)) {
      throw new Error(`Horse with name ${name} not found!`);
    }
  }
}

module.exports = { MyStablePage };
