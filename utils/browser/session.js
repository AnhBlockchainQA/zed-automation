const {chromium} = require('playwright');

class BrowserSession{

    async startTest(domain, headlessStatus, timeout){
        this.browser = await chromium.launch({headless: headlessStatus, args: ['--start-maximized'], timeout: timeout});
        let context = await this.browser.newContext();
        this.page = await context.newPage();
        this.navigationPromise = this.page.waitForNavigation();
        await this.page.goto(domain, {waitUntil: 'networkidle'});
    }

    async loadTestWithExtension(userDataDir, headlessStatus, pathToExtension, timeout, callback){
        let context = await chromium.launchPersistentContext(userDataDir, {
            headless: headlessStatus,
            timeout: timeout,
            args: [
              `--disable-extensions-except=${pathToExtension}`,
              `--load-extension=${pathToExtension}`
            ]
          })
        context.on("page", callback);  
    }

    async endTest(){
        await this.browser.close();
    }

    async pageOperation(){
        return this.page;
    }

    async pageNavigationPromise(){
        return await this.navigationPromise;
    }
}

module.exports = new BrowserSession