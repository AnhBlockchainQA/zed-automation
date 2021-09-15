import {BrowserContext, chromium, Page} from "playwright";
import Authorization from '../../pages/Authorization.page';
import * as data from '../../data/qa.json';
const pathToExtension = require('path').join(__dirname, '../../extensions/metamask-chrome-8.1.3');
const userDataDir = __dirname + "/test-user-data-dir";
const fs = require("fs-extra");

describe('Authorization', () => {

    let browserContext: BrowserContext;
    let page: Page;
    let auth: Authorization;
    let pages;

    beforeAll(async () => {
        await fs.remove(userDataDir, (err: any) => {
            if (err) return console.error(err);
        });
        browserContext = await chromium.launchPersistentContext(userDataDir,{
            headless: false,
            timeout: 0,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
                `--start-maximized`,
            ]
        });
        page = await browserContext.newPage();
        auth = new Authorization(page);
        const [tabs] = await Promise.all([
            browserContext.waitForEvent("page")
            // browserContext.backgroundPages()[0],
        ]);
        await tabs.waitForLoadState();
        pages = tabs.context().pages();
        // console.log(pages.length);
        // pages.forEach(page => {
        //     console.log(page.url());
        // })
        await pages[0].close();
        await pages[2].bringToFront();
    })

    beforeEach(async () => {
        await page.goto(data.baseUrl);
        await page.waitForLoadState();
    })

    afterAll(async () => {
        await page.close();
        await browserContext.close();
    });

    it('ZED-1 - Authorization with Existing Magic Account', async () => {
        expect(true).toBe(true);
    })

    xit('ZED-2 - Authorization Redirects from Magic Form to Metamask Sign In', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-4 - Authorization redirects from the START button shown on the main nav-bar to Choose Account/Options Modal', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-11 - Authorization with New Metamask Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-12 - Authorization with Existing Metamask Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-13 - Authorization with New Magic Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-14 - Authorization Content of What Is The Difference Modal', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-15 - Authorization Cancel Action with Existing Metamask Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-16 - Authorization Cancel Action with New Metamask Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-17 - Authorization redirects from the START button shown on the site header to Choose Account/Options Modal', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-18 - Authorization Cancel Action on Choose An Account Modal', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-19 - Authorization after user confirm the link sent to the email inbox', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-20 - Authorization forms shows an error message after any validation fails', async () => {
        expect('/').toBe('/');
    })



});
