const {chromium} = require('playwright');

class PageFactory{

    constructor(){
        this.context = null;
        this.browser = null;
    }

    async createBrowser(headlessStatus, timeout){
        this.browser = await chromium.launch({headless: headlessStatus, args: [`--start-maximized`], timeout: timeout});
        return this.browser;
    }    

    async createContext(headlessStatus, timeout){
        if(this.browser === null){
            await this.createBrowser(headlessStatus, timeout);
        }
        this.context = await this.browser.newContext();
        return this.context;
    }

    async getContext(headlessStatus, timeout){
        if(this.context === null){
            await this.createContext(headlessStatus, timeout);
        }
        return this.context;
    }

    async newTab(headlessStatus, timeout){
        await this.getContext(headlessStatus, timeout);
        return await this.context.newPage();
    }

    async endTest(){
        await this.context.close();
        await this.browser.close();
    }
}

module.exports = { PageFactory };