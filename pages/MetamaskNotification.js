const metamaskConfig = require("../locators/Metamask");

class MetamaskNotificationPage{

    constructor(page){
        this.page = page;
    }

    async clickOnNextButton(){
        console.log("--- Zed Run Automation Framework: Click on Next button ---");
        await this.page.waitForSelector(metamaskConfig.CLICK_NEXT_BUTTON, {timeout: 0})
        await this.page.click(metamaskConfig.CLICK_NEXT_BUTTON);
    }

    async clickOnConnectButton(){
        console.log("--- Zed Run Automation Framework: Click on Connect button ---");
        await this.page.waitForSelector(metamaskConfig.CLICK_CONNECT_BUTTON, {timeout: 0})
        await this.page.click(metamaskConfig.CLICK_CONNECT_BUTTON);
    }

    async clickOnSignButton(){
        console.log("--- Zed Run Automation Framework: Click on Sign button ---");
        await this.page.waitForSelector(metamaskConfig.CLICK_SIGN_BUTTON, {timeout: 0})
        await this.page.click(metamaskConfig.CLICK_SIGN_BUTTON);
    }

    async waitForLoadState(){
        console.log("--- Zed Run Automation Framework: Wait for load state ---");
        await this.page.waitForLoadState();
    }

    async waitForCloseEvent(){
        console.log("--- Zed Run Automation Framework: Wait for close event ---");
        await this.page.waitForEvent('close');
    }

    async clickOnConfirmButton(){
        console.log("--- Zed Run Automation Framework: Click on Confirm button  ---");
        await this.page.waitForSelector(metamaskConfig.CLICK_CONFIRM_BUTTON, {timeout: 0})
        await this.page.click(metamaskConfig.CLICK_CONFIRM_BUTTON);
    }
}

module.exports = { MetamaskNotificationPage };