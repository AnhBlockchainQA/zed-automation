import {BrowserContext, chromium, Page} from "playwright";
import Authorization from '../../pages/Authorization.page';
import Wallet from "../../pages/Wallet.page";
import * as data from '../../data/qa.json';
const pathToExtension = require('path').join(__dirname, '../../extensions/metamask-chrome-8.1.3');
const userDataDir = __dirname + "/test-user-data-dir";
const fs = require("fs-extra");

describe('Wallet', () => {

    let browserContext: BrowserContext;
    let page: Page;
    let auth: Authorization;
    let wallet: Wallet;
    let pages;
    let tabs;

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
        wallet = new Wallet(page);
        [tabs] = await Promise.all([
            browserContext.waitForEvent("page"),
            browserContext.backgroundPages()[0],
        ]);
        await tabs.waitForLoadState();
        pages = tabs.context().pages();
        await pages[0].close();
        await pages[2].bringToFront();
        await pages[2].reload();
        await pages[2].click(auth.objects.BTN_METAMASK_GET_STARTED);
        await pages[2].click(auth.objects.BTN_METAMASK_IMPORT_WALLET);
        await pages[2].click(auth.objects.BTN_METAMASK_I_AGREE);
        await pages[2].type(auth.objects.TEXT_AREA_METAMASK_PASSPHRASE, data.seed_phrase);
        await pages[2].type(auth.objects.TXT_METAMASK_PASSWORD, data.password);
        await pages[2].type(auth.objects.TXT_METAMASK_PASSWORD_CONFIRM, data.password);
        await pages[2].click(auth.objects.CHECKBOX_METAMASK_AGREE);
        await pages[2].click(auth.objects.BTN_METAMASK_IMPORT);
        await pages[2].click(auth.objects.BTN_METAMASK_ALL_DONE);
        await pages[2].click(auth.objects.BTN_METAMASK_CLOSE);
        await pages[2].click(auth.objects.BTN_METAMASK_NETWORK_NAME);
        await pages[2].click(auth.objects.BTN_METAMASK_CHOOSE_NETWORK);
        await pages[1].bringToFront();
        await pages[1].goto(data.baseUrl);
        await pages[1].waitForLoadState();
        await pages[1].click(auth.objects.BTN_NAV_START);
        const [windows] = await Promise.all([
            browserContext.waitForEvent("page"),
            await page.click(auth.objects.BTN_MODAL_METAMASK_LOGIN)
        ]);
        await windows.waitForLoadState();
        pages = windows.context().pages();
        await pages[2].bringToFront();
        await pages[2].click(auth.objects.BTN_METAMASK_NEXT);
        await pages[2].click(auth.objects.BTN_METAMASK_CONNECT);
        await pages[2].click(auth.objects.BTN_METAMASK_SIGN);
        await pages[0].bringToFront();
        await pages[1].close();
        await page.waitForTimeout(4000);
    })

    beforeEach(async () => {
        await page.goto(data.baseUrl);
        await page.waitForLoadState();
    })

    afterAll(async () => {
        await page.close();
        await browserContext.close();
    });

    it('ZED-90 - Wallet is shown to the user', async () => {
        expect(await page.isVisible(auth.objects.B_ETH_BALANCE)).toBe(true)
        expect(await page.isVisible(auth.objects.B_WETH_BALANCE)).toBe(true)
        expect(await page.isVisible(auth.objects.IMG_WALLET_ICON)).toBe(true)
    })

    it('ZED-91 - Wallet is shown to the user the balance in `$` Dollars Currency', async () => {
        expect(await page.innerText(auth.objects.B_ETH_BALANCE)).toContain(`USD`)
        expect(await page.innerText(auth.objects.B_ETH_BALANCE)).toContain(`$`)
        expect(await page.innerText(auth.objects.B_WETH_BALANCE)).toContain(`USD`)
        expect(await page.innerText(auth.objects.B_WETH_BALANCE)).toContain(`$`)
    })

    xit('ZED-92 - Wallet is shown to the user the Address', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-93 - Wallet is shown to the user after hit the three bullet icon', async () => {
        expect('/').toBe('/');
    })

    it('ZED-94 - Wallet is sidebar is closed it out after hit the X icon', async () => {
        await page.click(auth.objects.IMG_WALLET_ICON)
        expect(await page.isVisible(auth.objects.DIV_WALLET_MODAL_TITLE)).toBe(true)
        await page.click(auth.objects.IMG_CLOSE_WALLET_MODAL)
        await page.waitForTimeout(5000)
        expect(await page.isHidden(auth.objects.DIV_WALLET_MODAL_TITLE)).toBe(false)
    })

    xit('ZED-132 - Wallet is allowing the user to transfer/deposit to the address', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-133 - Wallet is allowing the user to transfer/withdraw to the address', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-134 - Wallet is showing the amount deposited into the address', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-135 - Wallet is allowing the user to select/change the displayed currency of the Account', async () => {
        expect('/').toBe('/');
    })

    xit('ZED-136 - Wallet is allowing the user to Send ETH to another account through ETH Modal', async () => {
        expect('/').toBe('/');
    })

});
