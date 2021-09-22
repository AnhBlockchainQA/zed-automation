import {Page} from "playwright";

class Wallet {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        IMG_WALLET_ICON: "//div[@class='right']/following-sibling::img[1]",
        B_ETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]',
        B_WETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]',
        IMG_CLOSE_WALLET_MODAL:'.close-icon',
        DIV_WALLET_MODAL_TITLE: '//div[text()=\'Wallet settings\']',
        DDL_DISPLAY_CURRENCY: '.sidebar-content > .currency-part > .z-select > .z-select__control',
        LBL_DDL_DISPLAYED_CURRENCY: '.sidebar-content > .currency-part > .z-select > .z-select__control > .z-select__value-container',
        LBL_DDL_DISPLAY_CURRENCY_SELECTED: '//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')]//div[1]',
        DDL_DISPLAY_CURRENCY_ETH: '#react-select-2-option-0',
        DDL_DISPLAY_CURRENCY_USD_DOLLARS: '#react-select-2-option-1',
        DDL_DISPLAY_CURRENCY_AUD_DOLLARS: '#react-select-2-option-2',
        DDL_DISPLAY_CURRENCY_GPY_DOLLARS: '#react-select-2-option-3',
        DDL_DISPLAY_CURRENCY_GB_POUNDS: '#react-select-2-option-4',
    }

    divUserBalance = async () => await this.page.$('.balance-part');
    lblWalletUserModalTitle = async () => await this.page.waitForSelector('//div[text()=\'Wallet settings\']');
    imgWalletUserIcon = async () => await this.page.waitForSelector('//div[@class=\'right\']/following-sibling::img[1]');
    lblETHUserBalance = async () => await this.page.waitForSelector('//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]');
    lblWETHUserBalance = async () => await this.page.waitForSelector('//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]');
    ddlWalletDisplayCurrency = async  () => await this.page.waitForSelector('.sidebar-content > .currency-part > .z-select > .z-select__control');
    lblWalletDisplayedCurrencyOnDDL = async () => await this.page.waitForSelector('//div[contains(@class,\'z-select__value-container z-select__value-container--has-value\')]//div[1]')
    ddlWalletCurrencyETH = async () => await this.page.waitForSelector('#react-select-2-option-0')
    ddlWalletCurrencyUSDDollar = async () => await this.page.waitForSelector('#react-select-2-option-1')
    ddlWalletCurrencyAUDDollar = async () => await this.page.waitForSelector('#react-select-2-option-2')
    ddlWalletCurrencyJPYDollar = async () => await this.page.waitForSelector('#react-select-2-option-3')
    ddlWalletCurrencyGBPPound = async () => await this.page.waitForSelector('#react-select-2-option-4')

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }

}

export default Wallet
