const marketPlaceConfig = require("../locators/MarketPlace");
 

class MarketplacePage{
    constructor(page){
        this.page = page;
    }

    async clickFirstHorsePreview(){
        await this.page.waitForSelector(marketPlaceConfig.FIRST_HORSE_PREVIEW);
        await this.page.click(marketPlaceConfig.FIRST_HORSE_PREVIEW);
    }

    async clickBuyWithCreditCard(){
        await this.page.waitForSelector(marketPlaceConfig.BUY_WITH_CREDIT_CARD_BUTTON);
        await this.page.click(marketPlaceConfig.BUY_WITH_CREDIT_CARD_BUTTON);
    }

    async findFrameByMatchingUrl(url){
        let frames = await this.page.frames();
        return frames.find(f => f.url().includes(url))
    }

    async waitUntilPaymentFormPresent(){
        await this.page.waitForSelector(marketPlaceConfig.BUY_WITH_CREDIT_CARD_LABEL, {visible: true});
        await this.page.waitForTimeout(5000);
    }

    async typeCreditCardNumber(cardNumber){
        const cardNumberFrame = await this.findFrameByMatchingUrl("cardNumber");
        await cardNumberFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT);
        await cardNumberFrame.click(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT);
        await cardNumberFrame.type(marketPlaceConfig.CREDIT_CARD_NUMBER_INPUT, cardNumber, {delay: 100});
    }

    async typeCreditCardExpirationDate(expireDate){
        const cardExpiryDateFrame = await this.findFrameByMatchingUrl("cardExpiry");
        await cardExpiryDateFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT);
        await cardExpiryDateFrame.click(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT);
        await cardExpiryDateFrame.type(marketPlaceConfig.CREDIT_CARD_EXPIRATION_DATE_INPUT, expireDate, {delay: 100});    
    }

    async typeCreditCardCVC(cvc){
        const cardCVCFrame = await this.findFrameByMatchingUrl("cardCvc");
        await cardCVCFrame.waitForSelector(marketPlaceConfig.CREDIT_CARD_CVC_INPUT);
        await cardCVCFrame.click(marketPlaceConfig.CREDIT_CARD_CVC_INPUT);
        await cardCVCFrame.type(marketPlaceConfig.CREDIT_CARD_CVC_INPUT, cvc, {delay: 100});    
    }

    async clickPayButton(){
        await this.page.waitForSelector(marketPlaceConfig.PAY_BUTTON);
        await this.page.click(marketPlaceConfig.PAY_BUTTON);
    }

    async checkPaySuccessfulLabelPresent(){
        try{
            await this.page.waitForSelector(marketPlaceConfig.PAYMENT_SUCESSFUL_LABEL, {visible : true});
            console.log(">>>> Element is present");
        }catch(error){
            console.log(">>>> Element is not present");
        }
    }

    async clickDoneButton(){
        await this.page.waitForSelector(marketPlaceConfig.DONE_BUTTON);
        await this.page.click(marketPlaceConfig.DONE_BUTTON); 
    }
}

module.exports = { MarketplacePage };