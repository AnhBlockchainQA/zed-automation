const paymentConfig = require("../locators/Payment");
// const fileUtils = require("../utils/api/stringUtils");

class PaymentPage {
  constructor(page) {
    this.page = page;
  }

  async bringToFront() {
    console.log("---- Zed Run Automation Framework: Bring page upfront ---");
    await this.page.bringToFront();
  }

  async clickOnBuyWithCreditCardButton() {
      console.log(
        "---- Zed Run Automation Framework: Click on Accept button ---"
      );
      await this.page.waitForSelector(
        paymentConfig.BUY_WITH_CREDIT_CARD_BUTTON,
        {
          visible: true,
          timeout: 5000,
        }
      );
      await this.page.click(paymentConfig.BUY_WITH_CREDIT_CARD_BUTTON);
  }

  async findFrameByMatchingUrl(url){
    console.log("--- Zed Run Automation Framework: Find frame by matching url ---");
    let frames = await this.page.frames();
    return frames.find(f => f.url().includes(url))
}

async waitUntilPaymentFormPresent(){
    console.log("--- Zed Run Automation Framework: Wait until payment form present ---");
    await this.page.waitForSelector(paymentConfig.BUY_WITH_CREDIT_CARD_LABEL, {visible: true, timeout: 0}).then(
        console.log('Payment form already shown up!')
    );
    await this.page.waitForLoadState();
}

async typeCreditCardNumber(cardNumber){
    console.log("--- Zed Run Automation Framework: Type credit card number ---");
    const cardNumberFrame = await this.findFrameByMatchingUrl("cardNumber");
    await cardNumberFrame.waitForSelector(paymentConfig.CREDIT_CARD_NUMBER_INPUT, {visible: true, timeout: 0}).then(
        console.log('Credit card number input field is displayed!')
    );
    await cardNumberFrame.click(paymentConfig.CREDIT_CARD_NUMBER_INPUT);
    await cardNumberFrame.type(paymentConfig.CREDIT_CARD_NUMBER_INPUT, cardNumber, {delay: 100});
}

async typeCreditCardExpirationDate(expireDate){
    console.log("--- Zed Run Automation Framework: Type credit card expiration date ---");
    const cardExpiryDateFrame = await this.findFrameByMatchingUrl("cardExpiry");
    await cardExpiryDateFrame.waitForSelector(paymentConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT, {timeout: 0, visible: true}).then(
        console.log('Credit card expiration date input field is displayed!')
    );
    await cardExpiryDateFrame.click(paymentConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT);
    await cardExpiryDateFrame.type(paymentConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT, expireDate, {delay: 100});    
}

async typeCreditCardCVC(cvc){
    console.log("--- Zed Run Automation Framework: Type credit card cvc number ---");
    const cardCVCFrame = await this.findFrameByMatchingUrl("cardCvc");
    await cardCVCFrame.waitForSelector(paymentConfig.CREDIT_CARD_CVC_INPUT, {visible: true, timeout: 0}).then(
        console.log('Credit card CVC input field is displayed!')
    );
    await cardCVCFrame.click(paymentConfig.CREDIT_CARD_CVC_INPUT);
    await cardCVCFrame.type(paymentConfig.CREDIT_CARD_CVC_INPUT, cvc, {delay: 100});    
}

async clickPayButton(){
    console.log("--- Zed Run Automation Framework: Click on Pay button ---");
    await this.page.waitForSelector(paymentConfig.PAY_BUTTON, {visible : true, timeout: 0}).then(
        console.log('Pay button is displayed!')
    );
    await this.page.click(paymentConfig.PAY_BUTTON);
}

async checkPaySuccessfulLabelPresent(){
    console.log("--- Zed Run Automation Framework: Check if Payment sucessful label is present ---");
    try{
        await this.page.waitForSelector(paymentConfig.PAYMENT_SUCESSFUL_LABEL, {visible : true, timeout: 0});
        console.log(">>>> Element is present");
    }catch(error){
        console.log(">>>> Element is not present");
    }
}

async clickDoneButton(){
    console.log("--- Zed Run Automation Framework: Click Done button ---");
    await this.page.waitForSelector(paymentConfig.DONE_BUTTON, {timeout: 0, visible: true}).then(
        console.log('Done button is present')
    )
    await this.page.click(paymentConfig.DONE_BUTTON); 
}

async clickOnBuyWithETH(){
    console.log("--- Zed Run Automation Framework: Click on Buy with ETH button ---");
    await this.page.waitForSelector(paymentConfig.BUY_WITH_ETH_BUTTON, {timeout: 0});
    await this.page.click(paymentConfig.BUY_WITH_ETH_BUTTON);
}

async clickOnUseDifferentCardIfNeed(){
    console.log("--- Zed Run Automation Framework: Click on Use different card if needed ---");
    try{
       await this.page.waitForSelector(paymentConfig.USE_DIFFERENT_CARD_BUTTON, {timeout: 10000});
       await this.page.click(paymentConfig.USE_DIFFERENT_CARD_BUTTON);
    }catch{
       console.log('Element is not present! We did not have saved card yet!')
    }
}

  
}

module.exports = { PaymentPage };
