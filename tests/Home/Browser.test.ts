import {Browser, BrowserContext, chromium, Page} from "playwright";
import Home from '../../pages/Home.page';
import * as data from '../../data/qa.json';

describe('[Suite] Home', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let home: Home;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 50
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(data.baseUrl);
        await page.waitForLoadState();
        home =  new Home(page);
    })

    it('ZED-97 - Home is showing up the modal with a warning message when the Metamask Extension has not been installed @fast', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.startWithMetamask();
        await page.waitForSelector('//*[@id="login-modal"]/h1');
        expect(await page.textContent('//*[@id="login-modal"]/h1')).toContain(`HAVE YOU INSTALLED METAMASK?`);
        expect(await page.textContent('//*[@id="login-modal"]/p[1]')).toContain(`ZED has detected that your browser does not have MetaMask installed. MetaMask is widely used by many blockchain applications in order to keep your information secure.`);
        expect(await page.textContent('//*[@id="login-modal"]/p[2]')).toContain(`What is MetaMask? Head over to our  FAQ`);
        expect(await page.textContent('//*[@id="login-modal"]/a')).toContain(`Install Metamask`);
        await page.click('//*[@id="login-modal"]/img[1]');
        expect(await home.getPageUrl()).toContain('home');
    })

    it('ZED-6', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.startWithMetamask();
        expect(await home.getPageUrl()).toContain('home');
    })

    it('ZED-7', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
    })

    afterAll( async () => {
        await page.close();
        await context.close();
        await browser.close();
    });

});
