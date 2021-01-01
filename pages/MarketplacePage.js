const marketPlaceConfig = require("../locators/MarketPlace");
const { HORSE_LIST_SIZE } = require("../data/env");

class MarketplacePage{
    constructor(page){
        this.page = page;
    }

    async clickFirstHorsePreview(){
        console.log("--- Zed Run Automation Framework: Click on First horse preview ---");
        await this.page.waitForSelector(marketPlaceConfig.FIRST_HORSE_PREVIEW, {visible: true, timeout: 0, waitUntil: 'networkidle'});
        await this.page.click(marketPlaceConfig.FIRST_HORSE_PREVIEW);
    }

    async clickOnDownwardArrow(){
        console.log("--- Zed Run Automation Framework: Click on downward arrow ---");
        await this.page.waitForSelector(marketPlaceConfig.DOWNWARD_ARROW, {timeout: 0});
        await this.page.click(marketPlaceConfig.DOWNWARD_ARROW);
    }

    async typeCoupon(value){
        console.log("--- Zed Run Automation Framework: Type discount coupon ---");
        await this.page.waitForSelector(marketPlaceConfig.COUPON_INPUT, {timeout: 0});
        console.log('Typing value is: ', value);
        await this.page.type(marketPlaceConfig.COUPON_INPUT, value, {delay: 100});
    }

    async clickApplyButton(){
        console.log("--- Zed Run Automation Framework: Click on Apply button ---");
        await this.page.waitForSelector(marketPlaceConfig.APPLY_BUTTON, {timeout: 0});
        await this.page.click(marketPlaceConfig.APPLY_BUTTON);
    }

    async verifyDiscountLabel(value){
        console.log("--- Zed Run Automation Framework: Verify if discount label shown correctly ---");
        try{
            await this.page.waitForSelector(marketPlaceConfig.DISCOUNT_LABEL, {visible: true, timeout: 0});
            const discountText = await this.page.evaluate((locator) => {
                return document.querySelector(locator).innerText;
              }, marketPlaceConfig.DISCOUNT_LABEL);
            return discountText.includes(value);  
          }catch(error){
            return false;
          }  
    }

    async getHorsePrice(){
        console.log("--- Zed Run Automation Framework: Get the horse price ---");
          await this.page.waitForSelector(marketPlaceConfig.HORSE_PRICE, {timeout:0});
          const value = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.HORSE_PRICE);
          console.log(">>>>>>>> Horse price is: " , value);
          return Number(value);
    }

    async getHorseName(){
        console.log("--- Zed Run Automation Framework: Get horse name ---");
        await this.page.waitForSelector(marketPlaceConfig.HORSE_NAME, {timeout: 0});
        const horseName = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.HORSE_NAME);
          console.log(">>>>>>>> Horse name is: " , horseName);
        return horseName;
    }

    async verifyDiscountPrice(value){
        console.log("--- Zed Run Automation Framework: Verify if discount price is correct ---");
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

    async waitUntilHorseListLoaded(){
        console.log("--- Zed Run Automation Framework: Wait until horse list loaded ---");
        await this.page.waitForFunction(
            ([locator,value]) => {
              return document.querySelectorAll(locator).length >= value;
            },
            [marketPlaceConfig.HORSE_LIST, HORSE_LIST_SIZE],
            { polling: 10000, timeout: 300000 }
          );
    }

    async verifyErrorMessage(message){
        console.log("--- Zed Run Automation Framework: Check if error message is correct ---");
        await this.page.waitForSelector(marketPlaceConfig.ERROR_MESSAGE, {timeout : 0});
        const error = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.ERROR_MESSAGE);
        return error.includes(message);
    }

}

module.exports = { MarketplacePage };