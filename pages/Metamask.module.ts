import { BrowserContext, chromium, Page } from 'playwright';
import * as data from '../fixtures/qa.json';

const pathToExtension = require('path').join(
  __dirname,
  '../extensions/MetaMask_10.1.1',
);
const userDataDir = __dirname + '/test-user-data-dir';
const fs = require('fs-extra');

class Metamask {
  private tabs: any;

  public pages: any;
  public browserContext: BrowserContext | undefined;

  objects = {
    BTN_METAMASK_GET_STARTED: '//button[text()=\'Get Started\']',
    BTN_METAMASK_IMPORT_WALLET: '//button[text()=\'Import wallet\']',
    BTN_METAMASK_I_AGREE: '//button[text()=\'I Agree\']',
    TEXT_AREA_METAMASK_PASSPHRASE:
      '[placeholder=\'Paste Secret Recovery Phrase from clipboard\']',
    TXT_METAMASK_PASSWORD: '#password',
    TXT_METAMASK_PASSWORD_CONFIRM: '#confirm-password',
    CHECKBOX_METAMASK_AGREE: '.first-time-flow__terms',
    BTN_METAMASK_IMPORT: '//button[text()=\'Import\']',
    BTN_METAMASK_ALL_DONE: 'text=\'All Done\'',
    BTN_METAMASK_CLOSE: '[title=\'Close\']',
    BTN_METAMASK_NETWORK_NAME: '.network-display',
    BTN_METAMASK_CHOOSE_NETWORK: 'text=\'Goerli Test Network\'',
    BTN_METAMASK_NEXT: 'text=\'Next\'',
    BTN_METAMASK_CONNECT: 'text=\'Connect\'',
    BTN_METAMASK_SIGN: 'text=\'Sign\'',
    BTN_METAMASK_CONFIRM: '//button[text()=\'Confirm\']',
    BTN_NAV_START: '//div[contains(text(),\'start\')]',
    BTN_MODAL_METAMASK_LOGIN: '#login-modal .login-options .metamask-login',
    IMG_WALLET_ICON: '//div[@class=\'right\']/following-sibling::img[1]',
    B_ETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]',
    B_WETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]',
    IMG_CLOSE_WALLET_MODAL: '.close-icon',
    DIV_WALLET_MODAL_TITLE: '//div[text()=\'Wallet settings\']',
    BTN_METAMASK_ETH_TRANSFER_CONFIRM: 'button[data-testid=\'page-container-footer-next\']',
    CONFIRM_CURRENCY_SUMMARY: '.confirm-page-container-summary__title-text .currency-display-component',
    BTN_SEND_ETH_CONFIRM: '.actions-buttons .primary-btn',
    BTN_TRANSFER_ETH_TOPOLYGON_CONFIRM: '.buttons-row button.primary-btn',
    BTN_POLYGON_DEPOSIT_SIGN: '.signature-request-footer .btn-primary.button',
    ADDRESS: '.address-container .address',
    ADDRESS_IN_POLYGONSCAN: `//span[contains(@class,'text-size-address text-secondary')]`
  };

  async init() {
    await fs.remove(userDataDir, (err: any) => {
      if (err) return console.error(err);
    });
    this.browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      timeout: 0,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        `--start-maximized`,
      ],
      recordVideo: {
        dir: 'videos/',
        size: { width: 640, height: 480 },
      }
    });
    this.browserContext.grantPermissions(["clipboard-read","notifications"])
    return this.browserContext;
  }

  async authenticate(browserContext: BrowserContext) {
    [this.tabs] = await Promise.all([
      browserContext.waitForEvent('page'),
      browserContext.backgroundPages()[0],
    ]);
    await this.tabs.waitForLoadState();
    this.pages = this.tabs.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].reload();
    await this.pages[1].click(this.objects.BTN_METAMASK_GET_STARTED);
    await this.pages[1].click(this.objects.BTN_METAMASK_IMPORT_WALLET);
    await this.pages[1].click(this.objects.BTN_METAMASK_I_AGREE);
    await this.pages[1].type(
      this.objects.TEXT_AREA_METAMASK_PASSPHRASE,
      data.seed_phrase,
    );
    await this.pages[1].type(this.objects.TXT_METAMASK_PASSWORD, data.password);
    await this.pages[1].type(
      this.objects.TXT_METAMASK_PASSWORD_CONFIRM,
      data.password,
    );
    await this.pages[1].click(this.objects.CHECKBOX_METAMASK_AGREE);
    await this.pages[1].click(this.objects.BTN_METAMASK_IMPORT);
    await this.pages[1].click(this.objects.BTN_METAMASK_ALL_DONE);
    await this.pages[1].click(this.objects.BTN_METAMASK_CLOSE);
    await this.pages[1].click(this.objects.BTN_METAMASK_NETWORK_NAME);
    await this.pages[1].click(this.objects.BTN_METAMASK_CHOOSE_NETWORK);
    await this.pages[0].bringToFront();
    await this.pages[0].goto(data.baseUrl);
    await this.pages[0].waitForLoadState();
    await this.pages[0].click(this.objects.BTN_NAV_START);
    const [windows] = await Promise.all([
      browserContext.waitForEvent('page'),
      await this.pages[0].click(this.objects.BTN_MODAL_METAMASK_LOGIN),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();

    await this.pages[2].bringToFront();
    await this.pages[2].click(this.objects.BTN_METAMASK_NEXT);
    await this.pages[2].click(this.objects.BTN_METAMASK_CONNECT);
    await this.pages[2].waitForTimeout(1000);
    await this.pages[2].click(this.objects.BTN_METAMASK_SIGN);
    await this.pages[0].bringToFront();
    await this.pages[1].close();
    await this.pages[1].waitForTimeout(4000);
    return this.pages;
  }

  async confirmEthTransfer(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.BTN_SEND_ETH_CONFIRM),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].reload();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.BTN_METAMASK_ETH_TRANSFER_CONFIRM);
    await this.pages[1].click(this.objects.BTN_METAMASK_ETH_TRANSFER_CONFIRM);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async confirmWithdrawETH(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.BTN_TRANSFER_ETH_TOPOLYGON_CONFIRM),
  ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.BTN_METAMASK_ETH_TRANSFER_CONFIRM);
    await this.pages[1].click(this.objects.BTN_METAMASK_ETH_TRANSFER_CONFIRM);
    await this.pages[1].waitForTimeout(1000);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async confirmDepositETH(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.BTN_SEND_ETH_CONFIRM),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.BTN_POLYGON_DEPOSIT_SIGN);
    await this.pages[1].click(this.objects.BTN_POLYGON_DEPOSIT_SIGN);
    await this.pages[1].waitForTimeout(1000);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }
  
  async validateAddressInPolygonscan(browserContext: BrowserContext){
    [this.tabs] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.ADDRESS),
    ]);
    await this.tabs.waitForLoadState();
    this.pages = this.tabs.context().pages();
    await this.pages[1].bringToFront();
    expect(await this.pages[1].isVisible(this.objects.ADDRESS_IN_POLYGONSCAN)).toBe(true);
    expect(await this.pages[1].innerText(this.objects.ADDRESS_IN_POLYGONSCAN)).toContain(data.wallet_address);
  }

  async close(pages: any, driver: BrowserContext) {
    await pages.close();
    await this.pages.close();
    await this.browserContext?.close();
    await driver.close();
  }
}

export default Metamask;
