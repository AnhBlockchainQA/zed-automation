const walletConfig = require("../locators/Wallet");
const { AMOUNT } = require("../data/env");
const { ETH_BALANCE } = require("../locators/Wallet");

class WalletPage {
  constructor(page) {
    this.page = page;
  }

  async clickOnDepositButton() {
    await this.page.waitForSelector(walletConfig.DEPOSITE_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.DEPOSITE_BUTTON);
  }

  async typeDepositeAmount(amount) {
    await this.page.waitForSelector(walletConfig.DEPOSITE_AMOUNT_INPUT, {
      visible: true,
      timeout: 0,
    });
    await this.page.fill(walletConfig.DEPOSITE_AMOUNT_INPUT, "");
    await this.page.type(walletConfig.DEPOSITE_AMOUNT_INPUT, amount, {
      delay: 50,
    });
  }

  async clickOnDepositeToZedWallet() {
    await this.page.waitForSelector(walletConfig.DEPOSITE_TO_ZED_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.DEPOSITE_TO_ZED_BUTTON);
  }

  async clickOnWithdrawButton() {
    await this.page.click(walletConfig.WITHDRAW_BUTTON);
  }

  async typeWithDrawAmount(amount) {
    await this.page.waitForSelector(walletConfig.WITHDRAW_AMOUNT_INPUT, {
      visible: true,
      timeout: 0,
    });
    await this.page.fill(walletConfig.WITHDRAW_AMOUNT_INPUT, "");
    await this.page.type(walletConfig.WITHDRAW_AMOUNT_INPUT, amount, {
      delay: 50,
    });
  }

  async clickOnWithdrawFromZedWallet() {
    await this.page.waitForSelector(walletConfig.WITHDRAW_FROM_ZED_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.WITHDRAW_FROM_ZED_BUTTON);
  }

  async getBalance(locator) {
    await this.page.waitForFunction(
      (locator) => {
        return Number(document.querySelector(locator).innerText) > 0;
      },
      locator,
      { polling: 5000, timeout: 60000 }
    );
    const value = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, locator);
    return Number(value);
  }

  async checkIfBalanceUpdated(locator, oldValue, newValue) {
    await this.page.waitForFunction(
      ([locator, oldValue]) => {
        return Number(document.querySelector(locator).innerText) < oldValue;
      },
      [locator, oldValue],
      { polling: 10000, timeout: 300000 }
    );
    const value = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, locator);
    if (Number(value).toFixed(2).trim() !== newValue.toFixed(2).trim()) {
      console.log(
        "Assertion failed: Actual balance [%s] is different to expected value [%s]",
        Number(value).toFixed(2).trim(),
        newValue.toFixed(2).trim()
      );
      return false;
    } else {
      return true;
    }
  }

  async getZedBalance() {
    return await this.getBalance(walletConfig.ZED_BALANCE);
  }

  async getETHBalance() {
    return await this.getBalance(walletConfig.ETH_BALANCE);
  }

  async checkIfZedBalanceUpdated(oldValue, newValue) {
    return await this.checkIfBalanceUpdated(walletConfig.ZED_BALANCE, oldValue, newValue);
  }

  async checkIfETHBalanceUpdated(oldValue, newValue) {
    return await this.checkIfBalanceUpdated(walletConfig.ETH_BALANCE, oldValue, newValue);
  }

  async scrollToZedBalance() {
    await this.page.waitForSelector(walletConfig.ZED_BALANCE, {
      visible: true,
      timeout: 0,
    });
    await this.page.$eval(walletConfig.ZED_BALANCE, (element) => {
      element.scrollIntoView(true);
    });
  }

}

module.exports = { WalletPage };
