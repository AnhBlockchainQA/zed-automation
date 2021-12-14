import Authorization from '../../pages/Authorization.page';
import Wallet from '../../pages/Wallet.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext } from 'playwright';

describe('Wallet', () => {
  let auth: Authorization;
  let wallet: Wallet;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    wallet = new Wallet(pages);
  });

  beforeEach(async () => {
    await pages[0].waitForLoadState();
    await pages[0].waitForTimeout(2000);
    await pages[0].waitForSelector(wallet.objects.DIV_BALANCE_PART)
    await pages[0].click(wallet.objects.DIV_BALANCE_PART)
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  it('ZED-90 - Wallet is shown to the user', async () => {
    expect(await pages[0].isVisible(wallet.objects.lbl_navbar_balance)).toBe(true);
    expect(await pages[0].isVisible(wallet.objects.lbl_navbar_balance_amount)).toBe(true);
    expect(await pages[0].isVisible(wallet.objects.IMG_WALLET_ICON)).toBe(true);
  });

  it('ZED-91 - Wallet is shown to the user the balance in `$` Dollars Currency', async () => {
    await pages[0].waitForSelector(wallet.objects.DIV_BALANCE_PART)
    await pages[0].click(wallet.objects.DIV_BALANCE_PART)
    expect(await pages[0].innerText(wallet.objects.lbl_navbar_balance_amount)).toContain(`$`);
  });

  xit('ZED-92 - Wallet is shown to the user the Address', async () => {
    expect(
        await pages[0].innerText(wallet.objects.B_WETH_BALANCE),
    ).toContain(`GBP (British Pound)`);
  });

  it('ZED-93 - Wallet is shown to the user after hit the wallet icon', async () => {
    await pages[0].click(wallet.objects.IMG_WALLET_ICON);
    expect(
      await pages[0].isVisible(wallet.objects.DIV_WALLET_MODAL_TITLE),
    ).toBe(true);
  });

  it('ZED-94 - Wallet is sidebar is closed it out after hit the X icon', async () => {
    await pages[0].click(wallet.objects.IMG_WALLET_ICON);
    expect(await pages[0].isVisible(wallet.objects.DIV_WALLET_MODAL_TITLE)).toBe(
      true,
    );
    await pages[0].click(wallet.objects.IMG_CLOSE_WALLET_MODAL);
    await pages[0].waitForTimeout(5000);
    expect(await pages[0].isHidden(wallet.objects.DIV_WALLET_MODAL_TITLE)).toBe(
      false
    );
  });

  xit('ZED-132 - Wallet is allowing the user to transfer/deposit to the address', async () => {
    expect('/').toBe('/');
  });

  xit('ZED-133 - Wallet is allowing the user to transfer/withdraw to the address', async () => {
    expect('/').toBe('/');
  });

  it('ZED-134 - Wallet is showing the amount deposited into the address', async () => {
    await pages[0].click(wallet.objects.BALANCE_NAV_INFO);
    let account_balance = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.B_ETH_BALANCE))
    let account_balance_wallet = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.BALANCE_WALLET_INFO))
    expect(account_balance).toStrictEqual(account_balance_wallet)
    await pages[0].click(wallet.objects.BTN_TRANSFER)
    let init_transfer_amount = await pages[0].innerText(wallet.objects.LBL_ETH_DLS_TRANSFER_AMOUNT_IN_MODAL)
    expect(await wallet.getNumberFromText(init_transfer_amount)).toContain('0.00')
    const _available_balance = await wallet.getNumberFromText(await pages[0].innerText(wallet.objects.P_AVAILABLE_BALANCE_USD))
    expect(parseInt(<string>_available_balance?.toString())).toBeGreaterThan(0)
    if (await pages[0].innerText(wallet.objects.LBL_ETH_TRANSFER_MODAL) === 'ETHEREUM')
      await pages[0].type(wallet.objects.TXT_TRANSFER_AMOUNT, '0.001')
      expect(await wallet.getNumberFromText(init_transfer_amount)).not.toStrictEqual('0.00')
      await pages[0].click(wallet.objects.BTN_TRANSFER_ETH_TO_POLYGON)
      expect(await pages[0].innerText(wallet.objects.H1_TRANSFER_ETH_TO_POLYGON_NETWORK)).toContain('TRANSFER ETH TO POLYGON NETWORK')
      expect(await pages[0].innerText(wallet.objects.SPAN_TRANSFER_ETH_TO_POLYGON_ASSETS_AMOUNT)).toContain('0.001 ETH')
      expect(await pages[0].innerText(wallet.objects.SPAN_TRANSFER_ETH_FROM)).toContain('Ethereum Mainnet')
      expect(await pages[0].innerText(wallet.objects.SPAN_TRANSFER_ETH_TO)).toContain('Polygon Mainnet')
      await pages[0].click(wallet.objects.BTN_TRANSFER_ETH_CONFIRM)
    await pages[0].waitForTimeout(3000)
  });



  it('ZED-135 - Wallet is allowing the user to select/change the displayed currency of the Account', async () => {
    await pages[0].click(wallet.objects.IMG_WALLET_ICON);
    await pages[0].click(wallet.objects.collapsePanelWalletSetting);
    await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY);
    expect(
      await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS),
    ).toContain(`GBP (British Pound)`);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS);
    expect(
      await pages[0].innerText(
        wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED,
      ),
    ).toContain(`GBP (British Pound)`);

    await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY);
    expect(
      await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_AUD_DOLLARS),
    ).toContain(`AUD (Australian Dollar)`);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_AUD_DOLLARS);
    expect(
      await pages[0].innerText(
        wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED,
      ),
    ).toContain(`AUD (Australian Dollar)`);

    await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY);
    expect(
      await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_USD_DOLLARS),
    ).toContain(`USD (US Dollar)`);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_USD_DOLLARS);
    expect(
      await pages[0].innerText(
        wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED,
      ),
    ).toContain(`USD (US Dollar)`);

    await pages[0].waitForSelector(wallet.objects.LBL_DDL_DISPLAYED_CURRENCY);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY);
    expect(
      await pages[0].innerText(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS),
    ).toContain(`GBP (British Pound)`);
    await pages[0].click(wallet.objects.DDL_DISPLAY_CURRENCY_GB_POUNDS);
    expect(
      await pages[0].innerText(
        wallet.objects.LBL_DDL_DISPLAY_CURRENCY_SELECTED,
      ),
    ).toContain(`GBP (British Pound)`);
  });

  xit('ZED-136 - Wallet is allowing the user to Send ETH to another account through ETH Modal', async () => {
    expect('/').toBe('/');
  });
});
