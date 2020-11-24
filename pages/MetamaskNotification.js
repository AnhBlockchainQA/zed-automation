const metamaskConfig = require("../locators/Metamask");

class MetamaskNotificationPage{

    constructor(page){
        this.page = page;
    }

    async clickOnNextButton(){
        await this.page.click(metamaskConfig.CLICK_NEXT_BUTTON);
    }

    async clickOnConnectButton(){
        await this.page.click(metamaskConfig.CLICK_CONNECT_BUTTON);
    }

    async clickOnSignButton(){
        await this.page.click(metamaskConfig.CLICK_SIGN_BUTTON);
    }

    async waitForLoadState(){
        await this.page.waitForLoadState();
    }

    async waitForCloseEvent(){
        await this.page.waitForEvent('close');
    }

    async clickOnConfirmButton(){
        await this.page.waitForSelector(metamaskConfig.CLICK_CONFIRM_BUTTON, {timeout: 0})
        await this.page.click(metamaskConfig.CLICK_CONFIRM_BUTTON);
    }
}

module.exports = { MetamaskNotificationPage };