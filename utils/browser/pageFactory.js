const {chromium} = require('playwright');
const pathToExtension = require("path").join(
  __dirname,
  "metamask-chrome-8.1.3"
);
const userDataDir = __dirname + "/test-user-data-dir";
const fs = require("fs-extra");

console.log("userDataDir:", userDataDir);


class PageFactory{

    constructor(){
        this.context = null;
        this.browser = null;
    }

    async removeCache(){
        console.log(">>>> User data dir", userDataDir);
        await fs.remove(userDataDir, (err) => {
          if (err) return console.error(err);
          console.log("success!");
        });
    }

    async createBrowser(headlessStatus, timeout){
        this.browser = await chromium.launch({headless: headlessStatus, timeout: timeout});
        return this.browser;
    }    

    async createContext(headlessStatus, timeout){
        if(this.browser === null){
            await this.createBrowser(headlessStatus, timeout);
        }
        this.context = await this.browser.newContext({ viewport: null });
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