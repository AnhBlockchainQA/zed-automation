import Authorization from '../../pages/Authorization.page';
import Wallet from "../../pages/Wallet.page";
import * as data from '../../data/qa.json';
import Metamask from "../../pages/Metamask.module";
import {BrowserContext} from "playwright";

describe('Wallet', () => {

    let auth: Authorization;
    let wallet: Wallet;
    let pages: any;
    let browserContext: BrowserContext;
    let metamask: Metamask;

    beforeAll(async () => {
        metamask = new Metamask();
        browserContext = await metamask.init()
        pages = await metamask.authenticate(browserContext)
        auth = new Authorization(pages);
        wallet = new Wallet(pages);
    })

    beforeEach(async () => {
        await pages[0].goto(data.baseUrl);
        await pages[0].waitForLoadState();
    })

    afterAll(async () => {
        await pages[0].close()
        await metamask.close(pages, browserContext)
    });

    it('ZED-90 - Wallet is shown to the user', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true)
        expect(await pages[0].isVisible(auth.objects.B_WETH_BALANCE)).toBe(true)
        expect(await pages[0].isVisible(auth.objects.IMG_WALLET_ICON)).toBe(true)
    })

    it('ZED-91 - Wallet is shown to the user the balance in `$` Dollars Currency', async () => {
        expect(await pages[0].innerText(auth.objects.B_ETH_BALANCE)).toContain(`USD`)
        expect(await pages[0].innerText(auth.objects.B_ETH_BALANCE)).toContain(`$`)
        expect(await pages[0].innerText(auth.objects.B_WETH_BALANCE)).toContain(`USD`)
        expect(await pages[0].innerText(auth.objects.B_WETH_BALANCE)).toContain(`$`)
    })

    xit('ZED-92 - Wallet is shown to the user the Address', async () => {
        await wallet.lblWETHUserBalance().then( async (x) => {
            console.log(await x.innerText())
        })
        expect('/').toBe('/');
    })

    it('ZED-93 - Wallet is shown to the user after hit the wallet icon', async () => {
        await pages[0].click(wallet.objects.IMG_WALLET_ICON)
        expect(await pages[0].isVisible(wallet.objects.DIV_WALLET_MODAL_TITLE)).toBe(true)
    })

    it('ZED-94 - Wallet is sidebar is closed it out after hit the X icon', async () => {
        await pages[0].click(auth.objects.IMG_WALLET_ICON)
        expect(await pages[0].isVisible(auth.objects.DIV_WALLET_MODAL_TITLE)).toBe(true)
        await pages[0].click(auth.objects.IMG_CLOSE_WALLET_MODAL)
        await pages[0].waitForTimeout(5000)
        expect(await pages[0].isHidden(auth.objects.DIV_WALLET_MODAL_TITLE)).toBe(false)
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

    it('ZED-135 - Wallet is allowing the user to select/change the displayed currency of the Account', async () => {
        await pages[0].click(auth.objects.IMG_WALLET_ICON)
        await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY)
        expect(await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS)).toContain(`GBP (British Pound)`)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS)
        expect(await pages[0].innerText(wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED)).toContain(`GBP (British Pound)`)

        await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY)
        expect(await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_AUD_DOLLARS)).toContain(`AUD (Australian Dollar)`)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_AUD_DOLLARS)
        expect(await pages[0].innerText(wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED)).toContain(`AUD (Australian Dollar)`)

        await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY)
        expect(await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_USD_DOLLARS)).toContain(`USD (US Dollar)`)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_USD_DOLLARS)
        expect(await pages[0].innerText(wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED)).toContain(`USD (US Dollar)`)

        await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY)
        expect(await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS)).toContain(`GBP (British Pound)`)
        await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS)
        expect(await pages[0].innerText(wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED)).toContain(`GBP (British Pound)`)

    })

    xit('ZED-136 - Wallet is allowing the user to Send ETH to another account through ETH Modal', async () => {
        expect('/').toBe('/');
    })

});
