const walletConfig = require("../locators/Wallet");
const { AMOUNT } = require('../data/env');
const { ETH_BALANCE } = require("../locators/Wallet");
 
class WalletPage {
    constructor(page){
        this.page = page;
    }

    async clickOnDepositButton(){
        await this.page.waitForSelector(walletConfig.DEPOSITE_BUTTON, {visible: true, timeout: 0});
        await this.page.click(walletConfig.DEPOSITE_BUTTON);
    }

    async typeDepositeAmount(amount){
        await this.page.waitForSelector(walletConfig.DEPOSITE_AMOUNT_INPUT, {visible: true, timeout: 0});
        await this.page.fill(walletConfig.DEPOSITE_AMOUNT_INPUT, '');
        await this.page.type(walletConfig.DEPOSITE_AMOUNT_INPUT, amount, {delay: 50});
    }

    async clickOnDepositeToZedWallet(){
        await this.page.waitForSelector(walletConfig.DEPOSITE_TO_ZED_BUTTON, {visible: true, timeout: 0});
        await this.page.click(walletConfig.DEPOSITE_TO_ZED_BUTTON);
    }

    async getETHBalance(){
        await this.page.waitForFunction((locator) => {
           return Number(document.querySelector(locator).innerText) > 0;
        }, walletConfig.ETH_BALANCE, {polling: 5000, timeout: 60000});
        const value = await this.page.evaluate((locator) => {return document.querySelector(locator).innerText;}, walletConfig.ETH_BALANCE);
        return Number(value);
    }

    async checkIfETHBalanceUpdated(oldValue, newValue){
        await this.page.waitForFunction(([locator, oldValue]) => {
                return Number(document.querySelector(locator).innerText) < oldValue;
             }, [walletConfig.ETH_BALANCE, oldValue], {polling: 10000, timeout: 300000});
        const value = await this.page.evaluate((locator) => {return document.querySelector(locator).innerText;}, walletConfig.ETH_BALANCE);
        if(Number(value).toFixed(2).trim() !== newValue.toFixed(2).trim()){
            console.log("Assertion failed: Actual ETH balance [%s] is different to expected value [%s]", Number(value).toFixed(2).trim(), newValue.toFixed(2).trim());
            return false;
        }else{
            return true;
        }
    }

    async clickOnWithDrawButton(){
        await this.page.waitForSelector(walletConfig.WITHDRAW_BUTTON, {visible: true, timeout: 0});
        await this.page.click(walletConfig.WITHDRAW_BUTTON);
    }

    async typeWithDrawAmount(amount){
        await this.page.waitForSelector(walletConfig.WITHDRAW_AMOUNT_INPUT, {visible: true, timeout: 0});
        await this.page.fill(walletConfig.WITHDRAW_AMOUNT_INPUT, '');
        await this.page.type(walletConfig.WITHDRAW_AMOUNT_INPUT, amount, {delay: 50});
    }

    async clickOnWithdrawFromZedWallet(){
        await this.page.waitForSelector(walletConfig.WITHDRAW_FROM_ZED_BUTTON, {visible: true, timeout: 0});
        await this.page.click(walletConfig.WITHDRAW_FROM_ZED_BUTTON);
    }

    async getZedBalance(){
        await this.page.waitForFunction((locator) => {
            return Number(document.querySelector(locator).innerText) > 0;
         }, walletConfig.ZED_BALANCE, {polling: 5000, timeout: 60000});
         const value = await this.page.evaluate((locator) => {return document.querySelector(locator).innerText;}, walletConfig.ZED_BALANCE);
         return Number(value);
    }

    async checkIfZedBalanceUpdated(oldValue, newValue){
        await this.page.waitForFunction(([locator, oldValue]) => {
                return Number(document.querySelector(locator).innerText) < oldValue;
             }, [walletConfig.ZED_BALANCE, oldValue], {polling: 10000, timeout: 300000});
        const value = await this.page.evaluate((locator) => {return document.querySelector(locator).innerText;}, walletConfig.ZED_BALANCE);
        if(Number(value).toFixed(2).trim() !== newValue.toFixed(2).trim()){
            console.log("Assertion failed: Actual ZED balance [%s] is different to expected value [%s]", Number(value).toFixed(2).trim(), newValue.toFixed(2).trim());
            return false;
        }else{
            return true;
        }
    }
}

module.exports = { WalletPage };