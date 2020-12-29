const StudServiceConfig = require("../locators/StudService");
const stringUtils = require("../utils/api/stringUtils");
const { REGEX } = require("../data/env");

class StudServicePage {
  constructor(page) {
    this.page = page;
  }

  async getListOfMaleHorses() {
    console.log("--- Zed Run Automation Framework: Get list  of male horses ---");
    await this.page.waitForSelector(StudServiceConfig.MALE_HORSE_LIST, {
      timeout: 0,
    });
    const size = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, StudServiceConfig.MALE_HORSE_LIST);
    console.log(">>>>>> Size of male horse list: ", size);
    return size;
  }

  async getRandomIndexOfMaleHorseFromList() {
    console.log("--- Zed Run Automation Framework: Get random index of male horse from list ---");
    let size = await this.getListOfMaleHorses();
    const index = Math.floor(Math.random() * size + 1);
    console.log(">>>>>> Index: ", index);
    return index;
  }

  async clickOnSelectedMaleHorseWithIndex(i) {
    console.log("--- Zed Run Automation Framework: Click on selected horse male with index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_MALE_HORSE,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async clickOnSelectMateButtonOfHorseWithIndex(i) {
    console.log("--- Zed Run Automation Framework: Click on Select Mate button of male horse with index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_SELECT_MATE_BUTTON,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async getHorseName(i) {
    console.log("--- Zed Run Automation Framework: Get name of male horse by index " + i + " ---");
    let selector = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_HORSE_NAME,
      i
    );
    const name = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, selector);
    console.log(">>>>>> Horse name ", name);

    return name;
  }

  async getSelectedMateHorseName() {
    console.log("--- Zed Run Automation Framework: Get selected mate horse name ---");
    await this.page.waitForSelector(StudServiceConfig.STUD_MALE_HORSE_NAME, {
      timeout: 0,
    });
    const name = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, StudServiceConfig.STUD_MALE_HORSE_NAME);
    console.log(">>>>>> Selected mate horse name ", name);
    return name;
  }

  async checkIfCorrectHorseNameSelected(expectedValue, actualValue) {
    console.log("--- Zed Run Automation Framework: Check if correct horse name is selected ---");
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
    console.log("--- Zed Run Automation Framework: Click on Select Female button ---");
    await this.page.waitForSelector(StudServiceConfig.SELECT_FEMALE_BUTTON, {
      timeout: 0,
    });
    await this.page.click(StudServiceConfig.SELECT_FEMALE_BUTTON);
  }

  async verifySelectFemalePopUpShown() {
    console.log("--- Zed Run Automation Framework: Verify select female popup shown ---");
    try {
      await this.page.waitForSelector(
        StudServiceConfig.SELECT_FEMALE_POPUP_HEADER,
        { timeout: 0 }
      );
      return true;
    } catch {
      return false;
    }
  }

  async getListOfFemaleHorse() {
    console.log("--- Zed Run Automation Framework: Get list of female horse ---");
    await this.page.waitForSelector(StudServiceConfig.FEMALE_HORSE_LIST, {
      timeout: 0,
    });
    const size = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, StudServiceConfig.FEMALE_HORSE_LIST);
    console.log(">>>>>> Size of female horse list: ", size);
    return size;
  }

  async getRandomIndexOfFemaleHorseFromList() {
    console.log("--- Zed Run Automation Framework: Get random index of female horse from list ---");
    let size = await this.getListOfFemaleHorse();
    const index = Math.floor(Math.random() * size + 1);
    console.log(">>>>>> Index: ", index);
    return index;
  }

  async getFemaleHorseName(i) {
    console.log("--- Zed Run Automation Framework: Get female horse name by index " + i + " ---");
    let selector = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_FEMALE_NAME,
      i
    );
    const name = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, selector);
    console.log(">>>>>> Female horse name ", name);

    return name;
  }

  async clickOnSelectedFemaleHorseWithIndex(i) {
    console.log("--- Zed Run Automation Framework: Click on selecte female horse with index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_FEMALE_HORSE,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async clickOnSelectButtonOfFemaleHorseWithIndex(i) {
    console.log("--- Zed Run Automation Framework: Click on Select button of female horse with index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      StudServiceConfig.SELECTED_FEMALE_SELECT_BUTTON,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async getSelectedFemaleHorseName() {
    console.log("--- Zed Run Automation Framework: Get name of selected female horse ---");
    await this.page.waitForSelector(
      StudServiceConfig.SELECT_FEMALE_HORSE_NAME,
      { timeout: 0 }
    );
    const name = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, StudServiceConfig.SELECT_FEMALE_HORSE_NAME);
    console.log(">>>>>> Selected female horse name ", name);
    return name;
  }

  async scrollToBuyCoverButton() {
    console.log("--- Zed Run Automation Framework: Scroll to Buy Cover button ---");
    await this.page.waitForSelector(StudServiceConfig.BUY_COVER_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.evaluate((locator) => {
      document.querySelector(locator).scrollIntoView(true);
    }, StudServiceConfig.BUY_COVER_BUTTON);
  }

  async clickOnBuyCoverButton() {
    console.log("--- Zed Run Automation Framework: Click on Buy Cover button ---");
    await this.page.waitForSelector(StudServiceConfig.BUY_COVER_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(StudServiceConfig.BUY_COVER_BUTTON);
  }

  async clickOnCheckActivityButton(){
    console.log("--- Zed Run Automation Framework: Click on Check Activity button ---");
    await this.page.waitForSelector(StudServiceConfig.CHECK_ACTIVITY_BUTTON, {
        visible: true,
        timeout: 0,
      });
    await this.page.click(StudServiceConfig.CHECK_ACTIVITY_BUTTON);
  }

}
module.exports = { StudServicePage };
