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
    btnMetamakGetStarted: '//button[text()=\'Get Started\']',
    btnMetamaskImportWallet: '//button[text()=\'Import wallet\']',
    btnMetamaskIAgree: '//button[text()=\'I Agree\']',
    textAreaMetamaskPassphrase:'[placeholder=\'Paste Secret Recovery Phrase from clipboard\']',
    txtMetamaskPassword: '#password',
    txtMetamaskPasswordConfirm: '#confirm-password',
    checkboxMetamaskAgree: '.first-time-flow__terms',
    btnMetamaskImport: '//button[text()=\'Import\']',
    btnMetamaskAllDone: 'text=\'All Done\'',
    btnMetamaskClose: '[title=\'Close\']',
    btnMetamaskNetworkName: '.network-display',
    btnMetamaskChooseNetwork: 'text=\'Goerli Test Network\'',
    btnMetamaskNext: 'text=\'Next\'',
    btnMetamaskConnect: 'text=\'Connect\'',
    btnMetamaskSign : 'text=\'Sign\'',
    btnMetamaskConfirm: '//button[text()=\'Confirm\']',
    btnNavStart: '//div[contains(text(),\'start\')]',
    btnModalMetamaskLogin: '#login-modal .login-options .metamask-login',
    imgWalletIcon: '//div[@class=\'right\']/following-sibling::img[1]',
    ethBalance: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]',
    wethBalance: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]',
    imgCloseWalletModal : '.close-icon',
    walletModalTitle: '//div[text()=\'Wallet settings\']',
    btnMetamaskEthTransferConfirm: 'button[data-testid=\'page-container-footer-next\']',
    confirmCurrencySummary: '.confirm-page-container-summary__title-text .currency-display-component',
    btnSendEthConfirm: '.actions-buttons .primary-btn',
    btnTransferEthToPolygonConfirm: '.buttons-row button.primary-btn',
    btnPolygonDepositSign: '.signature-request-footer .btn-primary.button',
    walletAddress: '.address-container .address',
    addressInPolysonscan: `//span[contains(@class,'text-size-address text-secondary')]`,
    btnConfirmBuyRacehorse: '.confirm-btn.primary-btn',
    btnTransactionSign: '.signature-request-footer button.btn-primary'
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
    await this.pages[1].click(this.objects.btnMetamakGetStarted);
    await this.pages[1].click(this.objects.btnMetamaskImportWallet);
    await this.pages[1].click(this.objects.btnMetamaskIAgree);
    await this.pages[1].type(
      this.objects.textAreaMetamaskPassphrase,
      data.seed_phrase,
    );
    await this.pages[1].type(this.objects.txtMetamaskPassword, data.password);
    await this.pages[1].type(
      this.objects.txtMetamaskPasswordConfirm,
      data.password,
    );
    await this.pages[1].click(this.objects.checkboxMetamaskAgree);
    await this.pages[1].click(this.objects.btnMetamaskImport);
    await this.pages[1].click(this.objects.btnMetamaskAllDone);
    await this.pages[1].click(this.objects.btnMetamaskClose);
    await this.pages[1].click(this.objects.btnMetamaskNetworkName);
    await this.pages[1].click(this.objects.btnMetamaskChooseNetwork);
    await this.pages[0].bringToFront();
    await this.pages[0].goto(data.baseUrl);
    await this.pages[0].waitForLoadState();
    await this.pages[0].click(this.objects.btnNavStart);
    const [windows] = await Promise.all([
      browserContext.waitForEvent('page'),
      await this.pages[0].click(this.objects.btnModalMetamaskLogin),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();

    await this.pages[2].bringToFront();
    await this.pages[2].click(this.objects.btnMetamaskNext);
    await this.pages[2].click(this.objects.btnMetamaskConnect);
    await this.pages[2].waitForTimeout(1000);
    await this.pages[2].click(this.objects.btnMetamaskSign);
    await this.pages[0].bringToFront();
    await this.pages[1].close();
    await this.pages[1].waitForTimeout(4000);
    return this.pages;
  }

  async confirmEthTransfer(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.btnSendEthConfirm),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].reload();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.btnMetamaskEthTransferConfirm);
    await this.pages[1].click(this.objects.btnMetamaskEthTransferConfirm);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async confirmWithdrawETH(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.btnTransferEthToPolygonConfirm),
  ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.btnMetamaskEthTransferConfirm);
    await this.pages[1].click(this.objects.btnMetamaskEthTransferConfirm);
    await this.pages[1].waitForTimeout(1000);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async confirmDepositETH(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.btnSendEthConfirm),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.btnPolygonDepositSign);
    await this.pages[1].click(this.objects.btnPolygonDepositSign);
    await this.pages[1].waitForTimeout(1000);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async confirmBuyRaceHorse(browserContext: BrowserContext){
    const [windows] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.btnConfirmBuyRacehorse),
    ]);
    await windows.waitForLoadState();
    this.pages = windows.context().pages();
    await this.pages[1].bringToFront();
    await this.pages[1].waitForTimeout(5000);
    await this.pages[1].waitForSelector(this.objects.btnTransactionSign);
    await this.pages[1].click(this.objects.btnTransactionSign);
    await this.pages[1].waitForTimeout(1000);
    await this.pages[0].bringToFront();
    await this.pages[0].waitForTimeout(15000);
  }

  async validateAddressInPolygonscan(browserContext: BrowserContext){
    [this.tabs] = await Promise.all([
    browserContext.waitForEvent('page'),
    await this.pages[0].click(this.objects.walletAddress),
    ]);
    await this.tabs.waitForLoadState();
    this.pages = this.tabs.context().pages();
    await this.pages[1].bringToFront();
    expect(await this.pages[1].isVisible(this.objects.addressInPolysonscan)).toBe(true);
    expect(await this.pages[1].innerText(this.objects.addressInPolysonscan)).toContain(data.wallet_address);
  }

  async close(pages: any, driver: BrowserContext) {
    await pages.close();
    await this.pages.close();
    await this.browserContext?.close();
    await driver.close();
  }
}

export default Metamask;
