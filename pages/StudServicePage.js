const stringUtils = require("../utils/api/stringUtils");
const { REGEX } = require("../data/env");
const { USER_AVATAR } = require("../locators/ZedRun");
const {
  MALE_HORSE_LIST,
  SELECTED_MALE_HORSE,
  SELECTED_SELECT_MATE_BUTTON,
  SELECTED_HORSE_NAME,
  STUD_MALE_HORSE_NAME,
  SELECT_FEMALE_BUTTON,
  SELECT_FEMALE_POPUP_HEADER,
  FEMALE_HORSE_LIST,
  SELECTED_FEMALE_NAME,
  SELECTED_FEMALE_HORSE,
  CHECK_ACTIVITY_BUTTON,
  BUY_COVER_BUTTON,
  SELECT_FEMALE_HORSE_NAME,
  SELECTED_FEMALE_SELECT_BUTTON,
  CONFIRM_BUTTON,
  SELECT_FEMALE_HORSE_NAME,
  SELECTED_FEMALE_SELECT_BUTTON,
  STUD_SERVICE_TAB,
} = require("../locators/StudService");

class StudServicePage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(30000);
  }

  async bringToFront() {
    await this.page.bringToFront();
  }

  async getSizeOfMaleHorses() {
    console.log(
      "--- Zed Run Automation Framework: Get list  of male horses ---"
    );
    try {
      await expect(this.page).toHaveSelector(MALE_HORSE_LIST, {
        timeout: 0,
      });
      const size = await this.page.evaluate((locator) => {
        return document.querySelectorAll(locator).length;
      }, MALE_HORSE_LIST);
      console.log(">>>>>> Size of male horse list: ", size);
      return size;
    } catch {
      return 0;
    }
  }

  async getRandomIndexOfMaleHorseFromList() {
    console.log(
      "--- Zed Run Automation Framework: Get random index of male horse from list ---"
    );
    let size = await this.getSizeOfMaleHorses();
    const index = Math.floor(Math.random() * size + 1);
    console.log(">>>>>> Index: ", index);
    return index;
  }

  async clickOnSelectedMaleHorseWithIndex(i) {
    console.log(
      "--- Zed Run Automation Framework: Click on selected horse male with index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_MALE_HORSE,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async clickOnSelectMateButtonOfHorseWithIndex(i) {
    console.log(
      "--- Zed Run Automation Framework: Click on Select Mate button of male horse with index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_SELECT_MATE_BUTTON,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async getHorseName(i) {
    console.log(
      "--- Zed Run Automation Framework: Get name of male horse by index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_HORSE_NAME,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    const name = await this.page.innerText(locator);
    console.log(">>>>>> Horse name ", name);
    return name;
  }

  async getSelectedMateHorseName() {
    console.log(
      "--- Zed Run Automation Framework: Get selected mate horse name ---"
    );
    await expect(this.page).toHaveSelector(STUD_MALE_HORSE_NAME, {
      timeout: 0,
    });
    const name = await this.page.innerText(STUD_MALE_HORSE_NAME);
    console.log(">>>>>> Selected mate horse name ", name);
    return name;
  }

  async checkIfCorrectHorseNameSelected(expectedValue, actualValue) {
    console.log(
      "--- Zed Run Automation Framework: Check if correct horse name is selected ---"
    );
    if (expectedValue == null) {
      throw new Error("Expected value is null! Please verify selector");
    }
    if (actualValue == null) {
      throw new Error("Actual value is null! Please verify selector");
    }
    if (expectedValue !== actualValue) {
      throw new Error(
        "Assertion failed: Actual balance [" +
          actualValue +
          "] is different to expected value [" +
          expectedValue +
          "]"
      );
    }
  }

  async clickOnSelectFemaleButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Select Female button ---"
    );
    await expect(this.page).toHaveSelector(SELECT_FEMALE_BUTTON, {
      timeout: 0,
    });
    await this.page.click(SELECT_FEMALE_BUTTON);
  }

  async verifySelectFemalePopUpShown() {
    console.log(
      "--- Zed Run Automation Framework: Verify select female popup shown ---"
    );
    try {
      await expect(this.page).toHaveSelector(SELECT_FEMALE_POPUP_HEADER, {
        timeout: 0,
      });
      return true;
    } catch {
      return false;
    }
  }

  async getListOfFemaleHorse() {
    console.log(
      "--- Zed Run Automation Framework: Get list of female horse ---"
    );
    await expect(this.page).toHaveSelector(FEMALE_HORSE_LIST, {
      timeout: 0,
    });
    const size = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, FEMALE_HORSE_LIST);
    console.log(">>>>>> Size of female horse list: ", size);
    return size;
  }

  async getRandomIndexOfFemaleHorseFromList() {
    console.log(
      "--- Zed Run Automation Framework: Get random index of female horse from list ---"
    );
    let size = await this.getListOfFemaleHorse();
    const index = Math.floor(Math.random() * size + 1);
    console.log(">>>>>> Index: ", index);
    return index;
  }

  async getFemaleHorseName(i) {
    console.log(
      "--- Zed Run Automation Framework: Get female horse name by index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_FEMALE_NAME,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    const name = await this.page.innerText(locator);
    console.log(">>>>>> Female horse name ", name);
    return name;
  }

  async clickOnSelectedFemaleHorseWithIndex(i) {
    console.log(
      "--- Zed Run Automation Framework: Click on select female horse with index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_FEMALE_HORSE,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async clickOnSelectButtonOfFemaleHorseWithIndex(i) {
    console.log(
      "--- Zed Run Automation Framework: Click on Select button of female horse with index " +
        i +
        " ---"
    );
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      SELECTED_FEMALE_SELECT_BUTTON,
      i
    );
    await expect(this.page).toHaveSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async getSelectedFemaleHorseName() {
    console.log(
      "--- Zed Run Automation Framework: Get name of selected female horse ---"
    );
    await expect(this.page).toHaveSelector(SELECT_FEMALE_HORSE_NAME, {
      timeout: 0,
    });
    const name = await this.page.innerText(SELECT_FEMALE_HORSE_NAME);
    console.log(">>>>>> Selected female horse name ", name);
    return name;
  }

  async scrollToBuyCoverButton() {
    console.log(
      "--- Zed Run Automation Framework: Scroll to Buy Cover button ---"
    );
    await expect(this.page).toHaveSelector(BUY_COVER_BUTTON, {
      timeout: 0,
    });
    await this.page.evaluate((locator) => {
      document.querySelector(locator).scrollIntoView(true);
    }, BUY_COVER_BUTTON);
  }

  async clickOnBuyCoverButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Buy Cover button ---"
    );
    await this.page.waitForSelector(BUY_COVER_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(BUY_COVER_BUTTON);
  }

  async clickOnCheckActivityButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Check Activity button ---"
    );
    await expect(this.page).toHaveSelector(CHECK_ACTIVITY_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(CHECK_ACTIVITY_BUTTON);
  }

  async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  async clickOnUserAvatar() {
    console.log(
      "--- Zed Run Automation Framework: Click on User Avatar icon ---"
    );
    try {
      await expect(this.page).toHaveSelector(USER_AVATAR, {
        visible: true,
        timeout: 0,
      });
      await this.page.click(USER_AVATAR);
    } catch {
      throw new Error("User avatar is not present or not clickable");
    }
  }

  async selectStudServiceTab() {
    console.log(
      "--- Zed Run Automation Framework: Select the Stub Service tab on Breeding page ---"
    );
    try {
      await this.page.waitForSelector(STUD_SERVICE_TAB, { timeout: 0 });
      await this.page.click(STUD_SERVICE_TAB);
    } catch {
      throw new Error("Stub Service is not present or not clickable");
    }
  }

  async validateDefaultValueOnStubServicePage() {
    const listOfInStud = ".accordion-content .panel";
    const numberOfHorseInStud = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, listOfInStud);
    console.log("Currently, The number of Horse In Stud: [%s]", listOfInStud);
    await expect(numberOfHorseInStud).toBeGreaterThanOrEqual(0);
  }

  async clickOnConfirmButton() {
    console.log(
      "--- Zed Run Automation Framework: Click on Confirm button ---"
    );
    try {
      await this.page.waitForSelector(CONFIRM_BUTTON, { timeout: 0 });
      await this.page.click(CONFIRM_BUTTON);
    } catch {
      throw new Error("Confirm button is not present or not clickable");
    }
  }
}

module.exports = { StudServicePage };
