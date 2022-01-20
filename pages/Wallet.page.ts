import { Page } from 'playwright';

class Wallet {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    IMG_WALLET_ICON: "//div[@class='right']/following-sibling::img[1]",
    DIV_BALANCE_PART: ".header-container > .header > .header-content > .right-part > .balance-part",
    B_ETH_BALANCE: "//*[@class='balance-part']//div[@class='right']/b[1]",
    B_WETH_BALANCE: "//*[@class='balance-part']//div[@class='right']/b[2]",
    BALANCE_NAV_INFO: '//div[text()=\'balance\']',
    BALANCE_WALLET_INFO: '//div[contains(@class,\'weth-balance-part lg-text\')]/following-sibling::b[1]',
    ETH_BALANCE_ON_WALLET: '//div[@class=\'balance\']//div[1]',
    IMG_CLOSE_WALLET_MODAL: '.close-icon',
    DIV_WALLET_MODAL_TITLE: "//div[contains(text(),'Wallet')]",
    BTN_TRANSFER: '.transfer-btn',
    LBL_ETH_TRANSFER_MODAL: '(//div[contains(@class,\'primary-text bold\')]/following-sibling::div)[1]/div/div[contains(@class,\'primary-text bold white\')]',
    LBL_ETH_DLS_TRANSFER_AMOUNT_IN_MODAL: '//input[contains(@class,\'z-input my-3\')]/following-sibling::span[1]',
    BTN_TRANSFER_ETH_TO_POLYGON: '//button[text()=\'Transfer ETH to Polygon\']',
    H1_TRANSFER_ETH_TO_POLYGON_NETWORK: '//div[@class=\'content\']//h1[1]',
    SPAN_TRANSFER_ETH_TO_POLYGON_ASSETS_AMOUNT: '(//span[@class=\'white\'])[1]',
    SPAN_TRANSFER_ETH_FROM: '//div[@class=\'from-to\']//span[1]',
    SPAN_TRANSFER_ETH_TO: '(//div[@class=\'from-to\']//span)[2]',
    BTN_TRANSFER_ETH_CONFIRM: '//button[text()=\'Confirm\']',
    TXT_TRANSFER_AMOUNT: '//div[@class=\'input-container\']//input[1]',
    H2_AVAILABLE_BALANCE_ON_MODAL: '(//div[@class=\'text-right\']//h2)[1]',
    P_AVAILABLE_BALANCE_USD: '(//h2[@class=\'white mb-2\']/following-sibling::p)[1]',
    DDL_DISPLAY_CURRENCY:
      '(//div[contains(@class,\'z-select\')]//div[contains(@class,\'z-select__control\')])[1]',
    LBL_DDL_DISPLAYED_CURRENCY:
      '(//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')]//div)[1]',
    LBL_DDL_DISPLAY_CURRENCY_SELECTED:
      "//div[contains(@class,'z-select__value-container z-select__value-container--has-value')]//div[1]",
    DDL_DISPLAY_CURRENCY_ETH: '//*[contains(text(),\'ETH (Ethereum)\')]',
    DDL_DISPLAY_CURRENCY_USD_DOLLARS: '//*[contains(text(),\'USD (US Dollar)\')]',
    DDL_DISPLAY_CURRENCY_AUD_DOLLARS: '//*[contains(text(),\'AUD (Australian Dollar)\')]',
    DDL_DISPLAY_CURRENCY_GPY_DOLLARS: '//*[contains(text(),\'JPY (Japanese Yen)\')]',
    DDL_DISPLAY_CURRENCY_GB_POUNDS: '//*[contains(text(),\'GBP (British Pound)\')]',
    lbl_navbar_balance: '//div[text()=\'balance\']',
    lbl_navbar_balance_amount: '//div[@class=\'right\']//b[1]',
    collapsePanelWalletSetting: '//span[text()=\'Wallet Settings\']',
    BTN_SEND_ETH: '.send-eth-button',
    ETHEREUM_WALLET_ADDRESS: '.wallet-input .my-3.z-input',
    ETHEREUM_INPUT_AMOUNT: '.amount-input .amount-input-container .z-input',
    BTN_TRANSFER_ETH: '.send-eth-modal-content .primary-btn',
    BTN_SEND_ETH_CONFIRM: '.actions-buttons .primary-btn',
    IMG_LOADER:'.loader-container img',
    IMG_TRANSACTION_SUCCESS:'.withdraw-success img',
    TRANSACTION_SUCCESS_MODAL: '.send-eth-modal-content .withdraw-success',
    TRANSACTION_STATUS: '.info-card-container.tx-in-process',
    TRANSACTION_AMOUNT: '.col-6.text-right .white',
    BTN_TOPUP: '.topup-btn',
    TOP_UP_OPTION_RECEIVE: `//h4[text()='Receive']`,
    TOP_UP_OPTION_BUY:`//h4[text()='Buy']`,
    BTN_COPY_ADDRESS: '.eth-address-container .primary-btn',
    CLOSE_ICON: '.close-icon[icon=\'[object Object]\']',
    BTN_NETWORK_SELECTOR: '.select-container .ETHEREUM',
    INPUT_POLYGON_NETWORK:`//div[text()='Polygon Network']`
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
