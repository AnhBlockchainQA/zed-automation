import {Browser, BrowserContext, chromium, Page} from "playwright";
import Home from '../../pages/Home.page';

describe('[Suite] Home', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let home: Home;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://goerli-test.zed.run/');
        await page.waitForLoadState();
        home =  new Home(page);
    })

    test('Test', async() => {
        expect(await home.getPageTitle()).toContain('ZED RUN | Digital Horse Racing')
        await home.clickOnStartButton();
        expect(await home.getPageUrl()).toContain('home');
        await home.clickOnMetamaskOption();
    })

    afterAll( async () => {
        await page.close();
        await context.close();
        await browser.close();
    });

});
