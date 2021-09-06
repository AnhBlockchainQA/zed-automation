import {Browser, BrowserContext, chromium, Page} from "playwright";

class Home {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        btnStart: '#app .app-content .header-desktop .start-part button',
        btnMetamaskOption: '#login-modal .login-options .metamask-login'
    }

    btnStart = async () => await this.page.$('#app .app-content .header-desktop .start-part button');
    btnMetamaskOption = async () => await this.page.$('#login-modal .login-options .metamask-login');

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }

    async startWithMetamask() {
        const btnStart = await this.btnStart();
        if ( btnStart != null)
            await btnStart.click();
        else throw new Error('Start Button Not Found!');
        const btnMetamask = await this.btnMetamaskOption();
        if (btnMetamask != null)
            await btnMetamask.click();
        else throw new Error('Metamask Login Option not found!');
    }

    async clickOnStartButton() {
        await this.page.waitForSelector(this.objects.btnStart);
        return await this.page.click(this.objects.btnStart);
    }

    async clickOnMetamaskOption() {
        await this.page.waitForSelector(this.objects.btnMetamaskOption, {timeout: 0});
        await this.page.click(this.objects.btnMetamaskOption);
    }


}

export default Home
