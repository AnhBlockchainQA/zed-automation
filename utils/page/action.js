const { WAIT_TIME } = require('../../data/env');

class PageActions {

    constructor(page){
        this.page = page;
    }

    async navigate(url){
        return await this.page.goto(url);
    }

    async setValue(element, value) {
        return await this.page.type(element, value);
    }

    async clickOnElement(element) {
        return await this.page.click(element);
    }

    async clickOnCheckBox(element) {
        return await this.page.check(element, true);
    }

    async waitForTimeout(){
        return await this.page.waitForTimeout(WAIT_TIME);
    }

    async waitForLocatorToBePresent(element){
        try{
            await this.page.waitForSelector(element, {timeout : WAIT_TIME});
            return true;
        }catch(error){
            return false;
        }
    }

    async bringToFront(){
        return await this.page.bringToFront();
    }

    async clickOnElementWithTimeout(element, timeout) {
        return await this.page.click(element, {timeout: timeout});
    }

    async waitForLoadState(page){
        return (await page).waitForLoadState();
    }

}

module.exports = new PageActions;