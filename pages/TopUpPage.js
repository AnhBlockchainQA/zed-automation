const depositeConfig = require("../locators/TopUp");
 
class TopUpPage{
    constructor(page){
        this.page = page;
    }

    async clickOnDepositButton(){
        await this.page.waitForSelector(depositeConfig.DEPOSITE_BUTTON, {visible: true});
        await this.page.click(depositeConfig.DEPOSITE_BUTTON);
    }

    async typeDepositeAmount(amount){
        await this.page.waitForSelector(depositeConfig.DEPOSITE_AMOUNT_INPUT, {visible: true});
        await this.page.fill(depositeConfig.DEPOSITE_AMOUNT_INPUT, '');
        await this.page.type(depositeConfig.DEPOSITE_AMOUNT_INPUT, amount, {delay: 50});
    }

    async clickOnDepositeToZedWallet(){
        await this.page.waitForSelector(depositeConfig.DEPOSITE_TO_ZED_BUTTON, {visible: true});
        await this.page.click(depositeConfig.DEPOSITE_TO_ZED_BUTTON);
    }

    async waitForTimeout(timeout){
        await this.page.waitForTimeout(timeout);
    }

    async getCurrentZedBalance(){
        await this.page.waitForSelector(depositeConfig.CURRENT_ZED_BALANCE, {visible: true});
        return await this.page.textContent(depositeConfig.CURRENT_ZED_BALANCE);
    }
}

module.exports = { TopUpPage };