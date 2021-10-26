import { Page } from 'playwright';

class Wallet {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    IMG_WALLET_ICON: "//div[@class='right']/following-sibling::img[1]",
    B_ETH_BALANCE: "//*[@class='balance-part']//div[@class='right']/b[1]",
    B_WETH_BALANCE: "//*[@class='balance-part']//div[@class='right']/b[2]",
    IMG_CLOSE_WALLET_MODAL: '.close-icon',
    DIV_WALLET_MODAL_TITLE: "//div[contains(text(),'Wallet')]",
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
    lbl_navbar_balance: '//div[contains(text(),\'balance\')]',
    lbl_navbar_balance_amount: '//div[@class=\'right\']//b[1]',
    collapsePanelWalletSetting: '//span[text()=\'Wallet Settings\']'
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default Wallet;
