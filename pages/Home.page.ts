import {Browser, BrowserContext, chromium, Page} from "playwright";

class Home {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        btnStart: '#app .app-content .header-desktop .start-part button',
        btnMetamaskOption: '#login-modal .login-options .metamask-login'
    }

    btnStart = async () => await this.page.$('#app .app-content .header-desktop .start-part button');
    btnMetamaskOption = async () => await this.page.$('#login-modal .login-options .metamask-login');

    imgZedLogo = async () => await this.page.waitForSelector('.logo-img')
    lknImgZedLogo = async () => await this.page.waitForSelector('.header-content > .left-part > .logo-part > .logo')
    ddlNavRacing = async () => await this.page.waitForSelector('.icon-part-wrap:nth-child(2) > .menu-button > .icon-part > .icon-arrow > .icon')
    lblNavRacing = async () => await this.page.waitForSelector('//div[contains(text(),\'racing\')]')
    lknRacing = async () => await this.page.waitForSelector('//div[contains(text(),\'racing\')]/..')
    lknEvents = async () => await this.page.waitForSelector('//a[contains(text(),\'Events\')]')
    lknNextRun = async () => await this.page.waitForSelector('//a[contains(text(),\'Next to Run\')]')
    lknResults = async () => await this.page.waitForSelector('//a[contains(text(),\'Results\')]')
    lknWinnings = async () => await this.page.waitForSelector('//a[contains(text(),\'Winnings\')]')

    lblNavBreeding = async () => await this.page.waitForSelector('//div[contains(text(),\'BREEDING\')]')
    lknNavBreeding = async () => await this.page.waitForSelector('//div[contains(text(),\'BREEDING\')]/..')
    lblNavMarketplace = async () => await this.page.waitForSelector('//div[contains(text(),\'Marketplace\')]')
    lknNavMarketplace = async () => await this.page.waitForSelector('//div[contains(text(),\'Marketplace\')]/..')
    lblNavLearn = async () => await this.page.waitForSelector('//div[contains(text(),\'Learn\')]')
    lknNavLearn = async () => await this.page.waitForSelector('//div[contains(text(),\'Learn\')]/..')
    ddlNavLearn = async () => await this.page.waitForSelector('.icon-part-wrap:nth-child(5) > .menu-button > .icon-part > .icon-arrow > .icon')
    lknLearnGenesisRaceHorses = async () => await this.page.waitForSelector('//a[contains(text(),\'Genesis Racehorses\')]')
    lknLearnRoster = async () => await this.page.waitForSelector('//a[contains(text(),\'roster\')]')
    lknLearnHelp = async () => await this.page.waitForSelector('//a[contains(text(),\'Help\')]')
    lknLearnGettingStarted = async () => await this.page.waitForSelector('//a[contains(text(),\'Getting started\')]')
    lknLearnProductPortal = async () => await this.page.waitForSelector('//a[contains(text(),\'Product Portal\')]')



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
