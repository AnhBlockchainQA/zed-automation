const racingConfig = require("../locators/Racing");
const { EVENT_LIST_SIZE } = require("../data/env");
const stringUtils = require("../utils/api/stringUtils");
const { REGEX } = require("../data/env");

class RacingPage {
  constructor(page) {
    this.page = page;
    this.page.setDefaultTimeout(30000);
  }
  
  async waitUntilRacingEventShown(){
    console.log("--- Zed Run Automation Framework: Wait until racing event shown ---");
    try{
    await this.page.waitForFunction(
      ([locator,value]) => {
        return document.querySelectorAll(locator).length >= value;
      },
      [racingConfig.RACING_EVENT_LIST, EVENT_LIST_SIZE],
      10000, {timeout: 300000 }
    );
    }catch{
      throw new Error("Racing button is not shown");
    }
  }

  async getListOfRacingEvents(){
    console.log("--- Zed Run Automation Framework: Get list of racing event ---");
    await this.page.waitForSelector(racingConfig.RACING_EVENT_LIST, {
      timeout: 0,
    });
    const size = await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, racingConfig.RACING_EVENT_LIST);
    console.log(">>>>>> Size of free racing event list: ", size);
    return size;
  }

  async getRandomIndexOfRacingEvent() {
    console.log("--- Zed Run Automation Framework: Get random index of free racing event ---");
    let size = await this.getListOfRacingEvents();
    const index = Math.floor(Math.random() * size + 1);
    console.log(">>>>>> Index: ", index);
    return index;
  }

  async scrollToEventByIndexIfNeeded(i){
    console.log("--- Zed Run Automation Framework: Scroll to free event by index if needed ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_RACING_EVENT,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    if(i !== 1){
      await this.page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView(true);
      }, locator);
    }
  }
  
  async clickOnRacingEventWithIndex(i){
    console.log("--- Zed Run Automation Framework: Click on free racing event by index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_RACING_EVENT,
      i
    );
    await this.page.waitForSelector(locator, { timeout: 0 });
    await this.page.click(locator);
  }

  async getRegisteredHorsesInfo(i){
    console.log("--- Zed Run Automation Framework: Get registered horses info of racing event with index " + i + " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_GATE_REGISTERED_INFO,
      i
    );
    await this.page.waitForSelector(locator, {timeout: 0});
    return await this.page.evaluate((selector) => {
      return document.evaluate(selector,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.innerText;
    }, locator);
  }

  async getNumberOfRegisteredHorse(i){
    console.log("--- Zed Run Automation Framework: Get number of registered horses of racing with index " + i +  " ---");
    const info = await this.getRegisteredHorsesInfo(i);
    return Number(stringUtils.splitStringByRegEx("/", info, 0));
  }  

  async getTotalNumberOfHorses(i){
    console.log("--- Zed Run Automation Framework: Get total number of horses of racing with index " + i +  " ---");
    const info = await this.getRegisteredHorsesInfo(i);
    return Number(stringUtils.splitStringByRegEx("/", info, 1));
  }  

  async scrollToOpenGatesBox(i){
    console.log("--- Zed Run Automation Framework: Scroll to open gate box of racing with index " + i +  " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_RACING_EVENT_GATE_HEADER,
      i
    );
    await this.page.waitForSelector();
    await this.page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView(true);
    }, locator);
  }

  async getRacingEventNameByIndex(i){
    console.log("--- Zed Run Automation Framework: Get racing event name with index " + i +  " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_RACING_EVENT_NAME,
      i
    );
    await this.page.waitForSelector(locator, {timeout: 0});
    return await this.page.evaluate((selector) => {
        return document.querySelector(selector).innerText;
    }, locator);
  }

  async getSizeOfOpenGatesList(i){
    console.log("--- Zed Run Automation Framework: Get size of open gates list of racing with index " + i +  " ---");
    let locator = await stringUtils.replaceTemplateString(
      REGEX.NUMBER,
      racingConfig.SELECTED_RACING_EVENT_OPEN_GATES_LIST,
      i
    );
    await this.page.waitForSelector();
    return await this.page.evaluate((locator) => {
      return document.querySelectorAll(locator).length;
    }, locator);
  }

  async validateOpenGatesListSizeCorrect(expectedValue, actualValue){
    console.log("--- Zed Run Automation Framework: Check if open gates list size is correct ---");
    if (expectedValue == null) {
      throw new Error("Expected value is null! Please verify selector");
    }
    if (actualValue == null) {
      throw new Error("Actual value is null! Please verify selector");
    }
    if (expectedValue !== actualValue) {
      throw new Error(
        "Assertion failed: Actual total number of open gates [" +
          actualValue +
          "] is different to expected total number of open gates [" +
          expectedValue +
          "]"
      );
    }
  }
}

module.exports = { RacingPage };
