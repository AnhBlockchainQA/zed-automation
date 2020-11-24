const depositeConfig = require("../locators/TopUp");
 

class TopUpPage{
    constructor(page){
        this.page = page;
    }

    async clickOnWalletIcon(){
        await this.page.waitForSelector(depositeConfig.WALLET_ICON, {visible: true});
        await this.page.click(depositeConfig.WALLET_ICON);
    }

    async clickOnDeposit(){
        await this.page.waitForSelector(depositeConfig.DEPOSITE_BUTTON, {visible: true});
        await this.page.click(depositeConfig.DEPOSITE_BUTTON);
    }
}

module.exports = { TopUpPage };