const marketPlaceConfig = require("../locators/MarketPlace");
const { HORSE_LIST_SIZE, THRESHOLD, WAIT_TIME } = require("../data/env");

class MarketplacePage{
    constructor(page){
        this.page = page;
    }

    async clickFirstHorsePreview(){
        await this.page.waitForSelector(marketPlaceConfig.FIRST_HORSE_PREVIEW, {visible: true, timeout: 0, waitUntil: 'networkidle'});
        await this.page.click(marketPlaceConfig.FIRST_HORSE_PREVIEW);
    }

    async clickBuyWithCreditCard(){
        await this.page.waitForSelector(marketPlaceConfig.BUY_WITH_CREDIT_CARD_BUTTON, {visible: true, timeout: 0}).then(
            console.log('Buy with credit card is displayed!')
        );
        await this.page.click(marketPlaceConfig.BUY_WITH_CREDIT_CARD_BUTTON);
        await this.page.waitForLoadState();
    }

    async findFrameByMatchingUrl(url){
        let frames = await this.page.frames();
        return frames.find(f => f.url().includes(url))
    }

    async waitUntilPaymentFormPresent(){
        await this.page.waitForSelector(marketPlaceConfig.BUY_WITH_CREDIT_CARD_LABEL, {visible: true, timeout: 0}).then(
            console.log('Payment form already shown up!')
        );
        await this.page.waitForLoadState();
    }

    async typeCreditCardNumber(cardNumber){
        const cardNumberFrame = await this.findFrameByMatchingUrl("cardNumber");
        await cardNumberFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT, {visible: true, timeout: 0}).then(
            console.log('Credit card number input field is displayed!')
        );
        await cardNumberFrame.click(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT);
        await cardNumberFrame.type(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT, cardNumber, {delay: 100});
    }

    async typeCreditCardExpirationDate(expireDate){
        const cardExpiryDateFrame = await this.findFrameByMatchingUrl("cardExpiry");
        await cardExpiryDateFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT, {timeout: 0, visible: true}).then(
            console.log('Credit card expiration date input field is displayed!')
        );
        await cardExpiryDateFrame.click(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT);
        await cardExpiryDateFrame.type(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT, expireDate, {delay: 100});    
    }

    async typeCreditCardCVC(cvc){
        const cardCVCFrame = await this.findFrameByMatchingUrl("cardCvc");
        await cardCVCFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_CVC_INPUT, {visible: true, timeout: 0}).then(
            console.log('Credit card CVC input field is displayed!')
        );
        await cardCVCFrame.click(marketPlaceConfig.CREDIT_CARD_CVC_INPUT);
        await cardCVCFrame.type(marketPlaceConfig.CREDIT_CARD_CVC_INPUT, cvc, {delay: 100});    
    }

    async clickPayButton(){
        await this.page.waitForSelector(marketPlaceConfig.PAY_BUTTON, {visible : true, timeout: 0}).then(
            console.log('Pay button is displayed!')
        );
        await this.page.click(marketPlaceConfig.PAY_BUTTON);
    }

    async checkPaySuccessfulLabelPresent(){
        try{
            await this.page.waitForSelector(marketPlaceConfig.PAYMENT_SUCESSFUL_LABEL, {visible : true, timeout: 0});
            console.log(">>>> Element is present");
        }catch(error){
            console.log(">>>> Element is not present");
        }
    }

    async clickDoneButton(){
        await this.page.waitForSelector(marketPlaceConfig.DONE_BUTTON, {timeout: 0, visible: true}).then(
            console.log('Done button is present')
        )
        await this.page.click(marketPlaceConfig.DONE_BUTTON); 
    }

    async clickOnBuyWithETH(){
        await this.page.waitForSelector(marketPlaceConfig.BUY_WITH_ETH_BUTTON, {timeout: 0});
        await this.page.click(marketPlaceConfig.BUY_WITH_ETH_BUTTON);
    }

    async clickOnDownwardArrow(){
        await this.page.waitForSelector(marketPlaceConfig.DOWNWARD_ARROW, {timeout: 0});
        await this.page.click(marketPlaceConfig.DOWNWARD_ARROW);
    }

    async typeCoupon(value){
        await this.page.waitForSelector(marketPlaceConfig.COUPON_INPUT, {timeout: 0});
        console.log('Typing value is: ', value);
        await this.page.type(marketPlaceConfig.COUPON_INPUT, value);
    }

    async clickApplyButton(){
        await this.page.waitForSelector(marketPlaceConfig.APPLY_BUTTON, {timeout: 0});
        await this.page.click(marketPlaceConfig.APPLY_BUTTON);
    }

    async verifyDiscountLabel(value){
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
          await this.page.waitForSelector(marketPlaceConfig.HORSE_PRICE, {timeout:0});
          const value = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.HORSE_PRICE);
          console.log(">>>>>>>> Horse price is: " , value);
          return Number(value);
    }

    async getHorseName(){
        await this.page.waitForSelector(marketPlaceConfig.HORSE_NAME, {timeout: 0});
        const horseName = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.HORSE_NAME);
          console.log(">>>>>>>> Horse name is: " , horseName);
        return horseName;
    }

    async verifyDiscountPrice(value){
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
        await this.page.waitForFunction(
            ([locator,value]) => {
              return document.querySelectorAll(locator).length == value;
            },
            [marketPlaceConfig.HORSE_LIST, HORSE_LIST_SIZE],
            { polling: 10000, timeout: 300000 }
          );
    }

    async verifyErrorMessage(message){
        await this.page.waitForSelector(marketPlaceConfig.ERROR_MESSAGE, {timeout : 0});
        const error = await this.page.evaluate((locator) => {
            return document.querySelector(locator).innerText;
          }, marketPlaceConfig.ERROR_MESSAGE);
        return error.includes(message);
    }

}

module.exports = { MarketplacePage };