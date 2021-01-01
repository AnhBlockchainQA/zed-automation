const walletConfig = require("../locators/Wallet");

class WalletPage {
  constructor(page) {
    this.page = page;
  }

  async clickOnDepositButton() {
    console.log(" ---- Zed Run Automation Framework: Click on Deposit button ---");
    await this.page.waitForSelector(walletConfig.DEPOSITE_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.DEPOSITE_BUTTON);
  }

  async typeDepositeAmount(amount) {
    console.log(" ---- Zed Run Automation Framework: Type deposit amount ---");
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
    console.log(" ---- Zed Run Automation Framework: Click on Deposite to Zed Balance button ---");
    await this.page.waitForSelector(walletConfig.DEPOSITE_TO_ZED_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.DEPOSITE_TO_ZED_BUTTON);
  }

  async clickOnWithdrawButton() {
    console.log(" ---- Zed Run Automation Framework: Click on Withdraw button ---");
    await this.page.waitForSelector(walletConfig.WITHDRAW_BUTTON, {timeout: 0, visible: true});
    await this.page.click(walletConfig.WITHDRAW_BUTTON);
  }

  async typeWithDrawAmount(amount) {
    console.log(" ---- Zed Run Automation Framework: Type withdraw amount ---");
    await this.page.waitForSelector(walletConfig.WITHDRAW_AMOUNT_INPUT, {
      visible: true,
      timeout: 0,
    });
    await this.page.fill(walletConfig.WITHDRAW_AMOUNT_INPUT, "");
    await this.page.type(walletConfig.WITHDRAW_AMOUNT_INPUT, amount, {delay: 50});
  }

  async clickOnWithdrawFromZedWallet() {
    console.log(" ---- Zed Run Automation Framework: Click on Withdraw from Zed Balance ---");
    await this.page.waitForSelector(walletConfig.WITHDRAW_FROM_ZED_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.WITHDRAW_FROM_ZED_BUTTON);
  }

  async getBalance(locator) {
    console.log(" ---- Zed Run Automation Framework: Get the balance ---");
    await this.page.waitForSelector(locator, {timeout: 0});
    await this.page.waitForFunction(
      (locator) => {
        return Number(document.querySelector(locator).innerText) > 0;
      },
      locator, 4000, {timeout: 0 }
    );
    const value = await this.page.evaluate((locator) => {
      return document.querySelector(locator).innerText;
    }, locator);
    return Number(value);
  }

  async checkIfBalanceUpdated(locator, oldValue, newValue) {
    console.log(" ---- Zed Run Automation Framework: Check if balance updated ---");
    await this.page.waitForSelector(locator, {timeout: 0});
    await this.page.waitForFunction(
      ([locator, oldValue]) => {
        return Number(document.querySelector(locator).innerText) < oldValue;
      },
      [locator, oldValue], 5000, {timeout: 0 });
    const value = await this.page.evaluate((locator) => {
      document.querySelector(locator).scrollIntoView(true);
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
    console.log(" ---- Zed Run Automation Framework: Get Zed Balance ---");
    return await this.getBalance(walletConfig.ZED_BALANCE);
  }

  async getETHBalance() {    
    console.log(" ---- Zed Run Automation Framework: Get ETH Balance ---");
    return await this.getBalance(walletConfig.ETH_BALANCE);
  }

  async checkIfZedBalanceUpdated(oldValue, newValue) {
    console.log(" ---- Zed Run Automation Framework: Check if Zed balance is updated ---");
    return await this.checkIfBalanceUpdated(walletConfig.ZED_BALANCE, oldValue, newValue);
  }

  async checkIfETHBalanceUpdated(oldValue, newValue) {
    console.log(" ---- Zed Run Automation Framework: Check if ETH balance is updated ---");
    this.scrollToZedBalance();
    return await this.checkIfBalanceUpdated(walletConfig.ETH_BALANCE, oldValue, newValue);
  }

  async scrollToZedBalance() {
    console.log(" ---- Zed Run Automation Framework: Scroll to Zed balance section ---");
    await this.page.waitForSelector(walletConfig.ZED_BALANCE, {
      visible: true,
      timeout: 0,
    });
    await this.page.evaluate((locator) => {
      document.querySelector(locator).scrollIntoView(true);
    }, walletConfig.ZED_BALANCE);
  }

  async clickOnConfirmDepositeButton() {
    console.log(" ---- Zed Run Automation Framework: Click on Confirm deposite button ---");
    await this.page.waitForSelector(walletConfig.CONFIRM_DEPOSITE_BUTTON, {
      visible: true,
      timeout: 0,
    });
    await this.page.click(walletConfig.CONFIRM_DEPOSITE_BUTTON, {timeout: 0});
  }
}

module.exports = { WalletPage };
