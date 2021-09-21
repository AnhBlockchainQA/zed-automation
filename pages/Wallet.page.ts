import {Page} from "playwright";

class Wallet {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        IMG_WALLET_ICON: "//div[@class='right']/following-sibling::img[1]",
        B_ETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]',
        B_WETH_BALANCE: '//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]'
    }

    divUserBalance = async () => await this.page.$('.balance-part');
    bETHUserBalance = async () => await this.page.waitForSelector('//*[@class=\'balance-part\']//div[@class=\'right\']/b[1]');
    bWETHUserBalance = async () => await this.page.waitForSelector('//*[@class=\'balance-part\']//div[@class=\'right\']/b[2]');

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }


}

export default Wallet
