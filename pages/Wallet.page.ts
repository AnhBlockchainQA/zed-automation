import { Page } from 'playwright';

class Wallet {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    imgWalletIcon: "//div[@class='right']/following-sibling::img[1]",
    divBalancePart: ".header-container > .header > .header-content > .right-part > .balance-part",
    ethBalance: "//*[@class='balance-part']//div[@class='right']/b[1]",
    wethBalance: "//*[@class='balance-part']//div[@class='right']/b[2]",
    balanceNavInfo: '//div[text()=\'balance\']',
    balanceWalletInfo: '//div[contains(@class,\'weth-balance-part lg-text\')]/following-sibling::b[1]',
    ethBalanceOnWallet: '//div[@class=\'balance\']//div[1]',
    imgCloseWalletModal: '.close-icon',
    walletModalTitle: "//div[contains(text(),'Wallet')]",
    btnTransfer: '.transfer-btn',
    lblEthTransferModal: '(//div[contains(@class,\'primary-text bold\')]/following-sibling::div)[1]/div/div[contains(@class,\'primary-text bold white\')]',
    lblEthDlsTransferAmountInModal: '//input[contains(@class,\'z-input my-3\')]/following-sibling::span[1]',
    btnTransferEthToPolygon: '//button[text()=\'Transfer ETH to Polygon\']',
    h1TransferEthToPolygonNetwork: '//div[@class=\'content\']//h1[1]',
    spanTransferEthToPolygonAssetAmount: '(//span[@class=\'white\'])[1]',
    spanTransferEthFrom: '//div[@class=\'from-to\']//span[1]',
    spanTransferEthTo: '(//div[@class=\'from-to\']//span)[2]',
    btnTransferEthConfirm: '//button[text()=\'Confirm\']',
    txtTransferAmount: '//div[@class=\'input-container\']//input[1]',
    h2AvailableBalanceOnModal: '(//div[@class=\'text-right\']//h2)[1]',
    availableBalanceUSD: '(//h2[@class=\'white mb-2\']/following-sibling::p)[1]',
    displayCurrency:
      '(//div[contains(@class,\'z-select\')]//div[contains(@class,\'z-select__control\')])[1]',
    lblDisplayedCurrency:
      '(//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')]//div)[1]',
    lblDisplayCurrencySelected:
      "//div[contains(@class,'z-select__value-container z-select__value-container--has-value')]//div[1]",
    ddlDisplayCurrencyEth: '//*[contains(text(),\'ETH (Ethereum)\')]',
    ddlDisplayCurrencyUSDollars: '//*[contains(text(),\'USD (US Dollar)\')]',
    ddlDisplayCurrencyAudDollars: '//*[contains(text(),\'AUD (Australian Dollar)\')]',
    ddlDisplayCurrencyGpyDollars: '//*[contains(text(),\'JPY (Japanese Yen)\')]',
    ddlDisplayCurrencyGbPounds: '//*[contains(text(),\'GBP (British Pound)\')]',
    lblNavbarBalance: '//div[text()=\'balance\']',
    lblNavbarBalanceAmount: '//div[@class=\'right\']//b[1]',
    collapsePanelWalletSetting: '//span[text()=\'Wallet Settings\']',
    btnSendEth: '.send-eth-button',
    ethereumWalletAddress: '.wallet-input .my-3.z-input',
    ethereumInputAmount: '.amount-input .amount-input-container .z-input',
    btnTransferEth: '.send-eth-modal-content .primary-btn',
    btnSendEthConfirm: '.actions-buttons .primary-btn',
    imgLoader:'.loader-container img',
    imgTransactionSuccess:'.withdraw-success img',
    transactionSuccessModal: '.send-eth-modal-content .withdraw-success',
    transactionStatus: '.info-card-container.tx-in-process',
    transactionAmount: '.col-6.text-right .white',
    btnTopup: '.topup-btn',
    topupOptionReceive: `//h4[text()='Receive']`,
    topupOptionBuy:`//h4[text()='Buy']`,
    btnCopyAddress: '.eth-address-container .primary-btn',
    closeIcon: '.close-icon[icon=\'[object Object]\']',
    btnNetworkSelector: '.select-container .ETHEREUM',
    inputPolygonNetwork:`//div[text()='Polygon Network']`,
    copyAddress: '.address-container .copy-icon',
    walletAddress: '.address-container .address'
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  async getNumberFromText(value: string){
    const regex = /[\d|,|.|e|E|\+]+/g;
    let amount = value.match(regex);
    return amount;
  }

  async isAvailableBalance (input: String) {
    let value = parseInt(String(input[0]), 10)
    return () => {
      if (value === 0) {
        throw new Error(`The amount ${input} is not valid for transactions`)
      }
    }
  }

}

export default Wallet;
