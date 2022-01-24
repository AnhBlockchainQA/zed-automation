import { Page } from 'playwright';

class Authorization {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnMetamakGetStarted: "//button[text()='Get Started']",
    btnMetamaskImportWallet: "//button[text()='Import wallet']",
    btnMetamaskIAgree: "//button[text()='I Agree']",
    textAreaMetamaskPassphrase:"[placeholder='Paste Secret Recovery Phrase from clipboard']",
    txtMetamaskPassword: '#password',
    txtMetamaskPasswordConfirm: '#confirm-password',
    checkboxMetamaskAgree: '.first-time-flow__terms',
    btnMetamaskImport: "//button[text()='Import']",
    btnMetamaskAllDone: "text='All Done'",
    btnMetamaskClose: "[title='Close']",
    btnMetamaskNetworkName: '.network-display',
    btnMetamaskChooseNetwork: "text='Goerli Test Network'",
    btnMetamaskNext: "text='Next'",
    btnMetamaskConnect: "text='Connect'",
    btnMetamaskSign: "text='Sign'",
    btnMetamaskConfirm: "//button[text()='Confirm']",
    btnMetamaskCancel: "//button[text()='Cancel']",
    btnNavStart: '//div[contains(text(),\'start\')]',
    btnModalMetamaskLogin: '#login-modal .login-options .metamask-login',
    imgWalletIcon: "//div[@class='right']/following-sibling::img[1]",
    ethBalance: "//*[@class='balance-part']//div[@class='right']/b[1]",
    wethBalance: "//*[@class='balance-part']//div[@class='right']/b[2]",
    imgCloseWalletModal: '.close-icon',
    walletModalTitle: "//div[text()='Wallet settings']",
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default Authorization;
